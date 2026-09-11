/**
 * CONFIGURATION FILE
 * Sequential Data Approval Workflow System
 * 
 * Centralized configuration for departments, triggers, and automation settings
 */

// ============================================
// WORKFLOW CONFIGURATION
// ============================================

const WORKFLOW_CONFIG = {
  // Department Configuration (add/remove departments as needed)
  departments: [
    { id: 1, name: "Department 1 Queue", confirmColumn: "Dept1_Confirmed", processedColumn: "Dept1_Processed", timestampColumn: "Dept1_Timestamp" },
    { id: 2, name: "Department 2 Queue", confirmColumn: "Dept2_Confirmed", processedColumn: "Dept2_Processed", timestampColumn: "Dept2_Timestamp" },
    { id: 3, name: "Department 3 Queue", confirmColumn: "Dept3_Confirmed", processedColumn: "Dept3_Processed", timestampColumn: "Dept3_Timestamp" },
    { id: 4, name: "Department 4 Queue", confirmColumn: "Dept4_Confirmed", processedColumn: "Dept4_Processed", timestampColumn: "Dept4_Timestamp" },
    { id: 5, name: "Department 5 Queue", confirmColumn: "Dept5_Confirmed", processedColumn: "Dept5_Processed", timestampColumn: "Dept5_Timestamp" },
    { id: 6, name: "Department 6 Queue", confirmColumn: "Dept6_Confirmed", processedColumn: "Dept6_Processed", timestampColumn: "Dept6_Timestamp" },
    { id: 7, name: "Department 7 Archive", confirmColumn: "Final_Approved", processedColumn: "Final_Processed", timestampColumn: "Final_Timestamp" }
  ],
  
  // Trigger Settings
  triggerMode: "AUTO", // "AUTO" or "MANUAL"
  autoTriggerInterval: 5, // Minutes: 5, 10, 15, or 20
  
  // Admin Settings
  adminEmail: "admin@example.com",
  enableNotifications: true,
  enableLogging: true
};

// ============================================
// TRIGGER MODE SETTINGS
// ============================================

/**
 * Get current trigger configuration
 */
function getTriggerConfig() {
  const config = {
    mode: WORKFLOW_CONFIG.triggerMode,
    interval: WORKFLOW_CONFIG.autoTriggerInterval,
    description: getTriggerDescription()
  };
  
  return config;
}

/**
 * Get human-readable trigger description
 */
function getTriggerDescription() {
  if (WORKFLOW_CONFIG.triggerMode === "MANUAL") {
    return "Manual: Data transfers when users confirm. No automatic scheduling.";
  } else {
    return `Auto: Data transfers every ${WORKFLOW_CONFIG.autoTriggerInterval} minutes.`;
  }
}

/**
 * Set trigger mode to AUTO
 * @param {number} intervalMinutes - 5, 10, 15, or 20
 */
function setAutoTrigger(intervalMinutes) {
  if (![5, 10, 15, 20].includes(intervalMinutes)) {
    throw new Error("Invalid interval. Must be 5, 10, 15, or 20 minutes.");
  }
  
  WORKFLOW_CONFIG.triggerMode = "AUTO";
  WORKFLOW_CONFIG.autoTriggerInterval = intervalMinutes;
  
  Logger.log(`✅ Trigger mode set to AUTO - ${intervalMinutes} minute intervals`);
  return getTriggerConfig();
}

/**
 * Set trigger mode to MANUAL
 * Data only transfers when explicitly confirmed and manual trigger is called
 */
function setManualTrigger() {
  WORKFLOW_CONFIG.triggerMode = "MANUAL";
  
  Logger.log("✅ Trigger mode set to MANUAL - transfers on confirmation only");
  return getTriggerConfig();
}

// ============================================
// DEPARTMENT MANAGEMENT
// ============================================

/**
 * Get all configured departments
 */
function getDepartments() {
  return WORKFLOW_CONFIG.departments;
}

/**
 * Get specific department config
 */
function getDepartment(deptId) {
  return WORKFLOW_CONFIG.departments.find(d => d.id === deptId);
}

/**
 * Get number of active departments
 */
function getActiveDepartmentCount() {
  return WORKFLOW_CONFIG.departments.length;
}

/**
 * Get final department (archive/destination)
 */
function getFinalDepartment() {
  return WORKFLOW_CONFIG.departments[WORKFLOW_CONFIG.departments.length - 1];
}

// ============================================
// LOGGING & NOTIFICATIONS
// ============================================

/**
 * Log message if logging is enabled
 */
function logIfEnabled(message) {
  if (WORKFLOW_CONFIG.enableLogging) {
    Logger.log(message);
  }
}

/**
 * Send notification if enabled
 */
function notifyIfEnabled(subject, body) {
  if (WORKFLOW_CONFIG.enableNotifications) {
    sendNotification(subject, body);
  }
}

/**
 * Send notification email
 */
function sendNotification(subject, body) {
  try {
    GmailApp.sendEmail(
      WORKFLOW_CONFIG.adminEmail,
      subject,
      body
    );
  } catch (error) {
    Logger.log("Error sending notification: " + error.message);
  }
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate workflow configuration
 */
function validateConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const missingSheets = [];
  
  for (const dept of WORKFLOW_CONFIG.departments) {
    if (!ss.getSheetByName(dept.name)) {
      missingSheets.push(dept.name);
    }
  }
  
  if (missingSheets.length > 0) {
    throw new Error("Missing sheets: " + missingSheets.join(", "));
  }
  
  Logger.log("✅ Configuration validated successfully");
  return true;
}

/**
 * Print current configuration to log
 */
function printConfig() {
  Logger.log("=== WORKFLOW CONFIGURATION ===");
  Logger.log(`Trigger Mode: ${WORKFLOW_CONFIG.triggerMode}`);
  Logger.log(`Auto Interval: ${WORKFLOW_CONFIG.autoTriggerInterval} minutes`);
  Logger.log(`Total Departments: ${getActiveDepartmentCount()}`);
  Logger.log("\nDepartment List:");
  
  for (const dept of WORKFLOW_CONFIG.departments) {
    Logger.log(`  ${dept.id}. ${dept.name}`);
  }
  
  Logger.log(`\nAdmin Email: ${WORKFLOW_CONFIG.adminEmail}`);
  Logger.log(`Notifications: ${WORKFLOW_CONFIG.enableNotifications ? "Enabled" : "Disabled"}`);
  Logger.log(`Logging: ${WORKFLOW_CONFIG.enableLogging ? "Enabled" : "Disabled"}`);
}
