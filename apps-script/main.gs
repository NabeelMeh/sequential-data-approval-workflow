/**
 * MAIN AUTOMATION ENGINE
 * Sequential Data Approval Workflow System
 * 
 * Supports:
 * - AUTO mode: Automatic routing every 5, 10, 15, or 20 minutes
 * - MANUAL mode: Routing only when explicitly triggered by confirmations
 * - Dynamic departments: Support for 2-7 departments
 * - Real-time confirmation tracking
 */

// ============================================
// MAIN EXECUTION FUNCTIONS
// ============================================

/**
 * AUTO MODE: Main function to run the approval workflow
 * Called by time-based trigger every N minutes (5, 10, 15, or 20)
 */
function runApprovalWorkflow() {
  if (WORKFLOW_CONFIG.triggerMode !== "AUTO") {
    Logger.log("⏭️  Skipping AUTO trigger - Workflow is in MANUAL mode");
    return;
  }
  
  logIfEnabled("🚀 Starting AUTO approval workflow...");
  
  try {
    validateConfig();
    routeAllDepartments();
    logIfEnabled("✅ AUTO workflow completed successfully");
  } catch (error) {
    logIfEnabled("❌ Error in AUTO workflow: " + error.message);
    notifyIfEnabled("🚨 Approval Workflow Error", `An error occurred:\n\n${error.message}`);
  }
}

/**
 * MANUAL MODE: Manually trigger data routing
 * Called when a user confirms data (via confirmation handler)
 * Immediately routes confirmed records to next department
 */
function triggerManualWorkflow() {
  if (WORKFLOW_CONFIG.triggerMode !== "MANUAL") {
    Logger.log("⏭️  Skipping MANUAL trigger - Workflow is in AUTO mode");
    return;
  }
  
  logIfEnabled("🚀 Starting MANUAL approval workflow...");
  
  try {
    validateConfig();
    routeAllDepartments();
    logIfEnabled("✅ MANUAL workflow completed successfully");
  } catch (error) {
    logIfEnabled("❌ Error in MANUAL workflow: " + error.message);
    notifyIfEnabled("🚨 Approval Workflow Error", `An error occurred:\n\n${error.message}`);
  }
}

/**
 * Route data through all department chains dynamically
 */
function routeAllDepartments() {
  const departments = getDepartments();
  
  // Route from each department to the next one
  for (let i = 0; i < departments.length - 1; i++) {
    const sourceDept = departments[i];
    const targetDept = departments[i + 1];
    
    try {
      routeFromDeptToDept(sourceDept, targetDept);
    } catch (error) {
      logIfEnabled(`❌ Failed routing from ${sourceDept.name} to ${targetDept.name}: ${error.message}`);
    }
  }
}

/**
 * Dynamic routing: Copy confirmed records from source dept to target dept
 * @param {Object} sourceDept - Source department config
 * @param {Object} targetDept - Target department config
 */
function routeFromDeptToDept(sourceDept, targetDept) {
  logIfEnabled(`📤 Processing ${sourceDept.name} → ${targetDept.name} transfers...`);
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName(sourceDept.name);
  const targetSheet = ss.getSheetByName(targetDept.name);
  
  if (!sourceSheet) {
    throw new Error(`Source sheet not found: ${sourceDept.name}`);
  }
  
  if (!targetSheet) {
    throw new Error(`Target sheet not found: ${targetDept.name}`);
  }
  
  const sourceData = sourceSheet.getDataRange().getValues();
  const sourceHeaders = sourceData[0];
  
  // Find the column indices
  const idCol = sourceHeaders.indexOf("ID");
  const confirmCol = sourceHeaders.indexOf(sourceDept.confirmColumn);
  const processedCol = sourceHeaders.indexOf(sourceDept.processedColumn);
  
  if (idCol === -1 || confirmCol === -1) {
    throw new Error(`Required columns not found in ${sourceDept.name}`);
  }
  
  let transferCount = 0;
  const rowsToUpdate = [];
  
  // Iterate through all rows (skip header)
  for (let i = 1; i < sourceData.length; i++) {
    const row = sourceData[i];
    const isConfirmed = row[confirmCol];
    const isProcessed = row[processedCol];
    
    // Check if record is confirmed and not yet processed
    if (isConfirmed === true && isProcessed !== true) {
      try {
        // Copy row to target department
        copyRowToTargetDept(row, sourceHeaders, targetSheet, targetDept);
        
        // Store row index for update (to avoid modifying during iteration)
        rowsToUpdate.push({
          rowIndex: i + 1,
          id: row[idCol],
          processedCol: processedCol + 1
        });
        
        transferCount++;
      } catch (error) {
        logIfEnabled(`✗ Failed to transfer ID ${row[idCol]}: ${error.message}`);
      }
    }
  }
  
  // Update processed status for all transferred rows
  for (const update of rowsToUpdate) {
    sourceSheet.getRange(update.rowIndex, update.processedCol).setValue(true);
    sourceSheet.getRange(update.rowIndex, update.processedCol).setBackground("#90EE90"); // Light green
    logIfEnabled(`✓ Transferred ID: ${update.id} from ${sourceDept.name} to ${targetDept.name}`);
  }
  
  logIfEnabled(`📊 ${sourceDept.name}→${targetDept.name}: Transferred ${transferCount} records`);
}

/**
 * Helper function to copy a row from source to target department
 * Dynamically maps columns and handles confirmation fields
 */
function copyRowToTargetDept(row, sourceHeaders, targetSheet, targetDept) {
  const targetHeaders = targetSheet.getRange(1, 1, 1, targetSheet.getLastColumn()).getValues()[0];
  const newRow = [];
  const finalDept = getFinalDepartment();
  const isFinalDept = (targetDept.id === finalDept.id);
  
  // Map columns from source to target
  for (let i = 0; i < targetHeaders.length; i++) {
    const header = targetHeaders[i];
    const sourceIndex = sourceHeaders.indexOf(header);
    
    if (sourceIndex !== -1) {
      // Column exists in source, copy it
      newRow.push(row[sourceIndex]);
    } else if (header === targetDept.confirmColumn) {
      // Target confirmation column - leave empty for manual entry
      newRow.push("");
    } else if (header === targetDept.timestampColumn) {
      // Timestamp column - leave empty until confirmed
      newRow.push("");
    } else if (header === targetDept.processedColumn) {
      // Processed column - initialize as false
      newRow.push(false);
    } else if (isFinalDept && header === "Final_Approved") {
      // Final archive: mark as not yet approved
      newRow.push(false);
    } else if (isFinalDept && header === "Final_Timestamp") {
      // Final timestamp - leave empty until final approval
      newRow.push("");
    } else if (isFinalDept && header === "Approval_Chain") {
      // Build approval chain
      newRow.push(buildApprovalChain());
    } else {
      // Unknown column - leave empty
      newRow.push("");
    }
  }
  
  // Add new row to target department sheet
  targetSheet.appendRow(newRow);
}

/**
 * Build approval chain string showing all departments
 */
function buildApprovalChain() {
  const depts = getDepartments();
  return depts.map(d => `Dept${d.id}`).join("→");
}

// ============================================
// CONFIRMATION HANDLERS
// ============================================

/**
 * Handle manual confirmation in any department sheet
 * Called when a user checks the confirmation box
 * In MANUAL mode, this triggers immediate routing
 */
function onEdit(e) {
  try {
    // Only process if in MANUAL mode
    if (WORKFLOW_CONFIG.triggerMode !== "MANUAL") {
      return;
    }
    
    const range = e.range;
    const sheetName = range.getSheet().getName();
    const columnIndex = range.getColumn();
    const rowIndex = range.getRow();
    
    // Get the edited value
    const editedValue = range.getValue();
    
    // Check if this is a confirmation column
    const dept = getDepartments().find(d => d.name === sheetName);
    if (!dept) return;
    
    const headers = range.getSheet().getRange(1, 1, 1, range.getSheet().getLastColumn()).getValues()[0];
    const columnName = headers[columnIndex - 1];
    
    // If confirmation column was checked
    if (columnName === dept.confirmColumn && editedValue === true) {
      logIfEnabled(`✅ Confirmation detected in ${sheetName}, row ${rowIndex}`);
      
      // Add timestamp
      const timestampCol = headers.indexOf(dept.timestampColumn) + 1;
      if (timestampCol > 0) {
        range.getSheet().getRange(rowIndex, timestampCol).setValue(new Date());
      }
      
      // Trigger manual workflow to route this record
      triggerManualWorkflow();
    }
  } catch (error) {
    logIfEnabled("Error in onEdit handler: " + error.message);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get workflow statistics
 * Shows pending and completed records at each stage
 */
function getWorkflowStats() {
  const departments = getDepartments();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = {};
  
  for (const dept of departments) {
    const sheet = ss.getSheetByName(dept.name);
    if (!sheet) continue;
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const confirmCol = headers.indexOf(dept.confirmColumn);
    
    let confirmed = 0;
    let pending = 0;
    
    for (let i = 1; i < data.length; i++) {
      if (confirmCol !== -1 && data[i][confirmCol] === true) {
        confirmed++;
      } else {
        pending++;
      }
    }
    
    stats[dept.name] = {
      confirmed: confirmed,
      pending: pending,
      total: data.length - 1
    };
  }
  
  return stats;
}

/**
 * Print detailed workflow statistics to log
 */
function printWorkflowStats() {
  const stats = getWorkflowStats();
  const config = getTriggerConfig();
  
  Logger.log("=== WORKFLOW STATISTICS ===");
  Logger.log(`Trigger Mode: ${config.mode}`);
  Logger.log(`Interval: ${config.interval} minutes (AUTO) or On-Demand (MANUAL)`);
  Logger.log("\nDepartment Status:");
  
  for (const [deptName, deptStats] of Object.entries(stats)) {
    Logger.log(`\n  ${deptName}:`);
    Logger.log(`    ✓ Confirmed: ${deptStats.confirmed}`);
    Logger.log(`    ⏳ Pending: ${deptStats.pending}`);
    Logger.log(`    Total: ${deptStats.total}`);
  }
}

/**
 * Export workflow statistics to a summary sheet
 */
function exportStatsToSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let statsSheet = ss.getSheetByName("Workflow Stats");
  
  if (!statsSheet) {
    statsSheet = ss.insertSheet("Workflow Stats");
  } else {
    statsSheet.clear();
  }
  
  const stats = getWorkflowStats();
  const config = getTriggerConfig();
  
  // Headers
  statsSheet.appendRow(["Department", "Confirmed", "Pending", "Total", "Completion %"]);
  
  // Data
  for (const [deptName, deptStats] of Object.entries(stats)) {
    const completionPct = deptStats.total > 0 
      ? ((deptStats.confirmed / deptStats.total) * 100).toFixed(2) + "%"
      : "N/A";
    
    statsSheet.appendRow([
      deptName,
      deptStats.confirmed,
      deptStats.pending,
      deptStats.total,
      completionPct
    ]);
  }
  
  // Format header row
  statsSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#4472C4").setFontColor("white");
  
  Logger.log("✅ Statistics exported to 'Workflow Stats' sheet");
}

/**
 * Test the workflow with sample data
 */
function testWorkflowWithSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dept1 = ss.getSheetByName("Department 1 Queue");
  
  if (!dept1) {
    Logger.log("❌ Department 1 Queue sheet not found");
    return;
  }
  
  // Add sample test data
  const sampleData = [
    ["TEST-001", "Sample Data A", "Value A", false, "", false],
    ["TEST-002", "Sample Data B", "Value B", false, "", false],
    ["TEST-003", "Sample Data C", "Value C", false, "", false]
  ];
  
  for (const row of sampleData) {
    dept1.appendRow(row);
  }
  
  Logger.log("✅ Added 3 sample records to Department 1 Queue for testing");
  Logger.log("📝 Next step: Manually check confirmation boxes to trigger workflow");
}

/**
 * Reset all processed flags to rerun workflow
 * Use with caution - this will re-route all data
 */
function resetProcessedFlags() {
  const departments = getDepartments();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  for (const dept of departments) {
    const sheet = ss.getSheetByName(dept.name);
    if (!sheet) continue;
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const processedCol = headers.indexOf(dept.processedColumn);
    
    if (processedCol !== -1) {
      for (let i = 2; i <= sheet.getLastRow(); i++) {
        sheet.getRange(i, processedCol + 1).setValue(false);
      }
    }
  }
  
  Logger.log("✅ All processed flags have been reset");
}
