/**
 * TRIGGERS CONFIGURATION & SETUP
 * Sequential Data Approval Workflow System
 * 
 * This file contains functions to set up and manage triggers
 * Supports both AUTO (time-based) and MANUAL (on-demand) modes
 */

// ============================================
// AUTO TRIGGER SETUP
// ============================================

/**
 * Create an AUTO trigger that runs every 5 minutes
 * Run this function ONCE to set up the trigger
 */
function createAutoTrigger5Min() {
  deleteExistingTriggers();
  setAutoTrigger(5);
  
  ScriptApp.newTrigger("runApprovalWorkflow")
    .timeBased()
    .everyMinutes(5)
    .create();
  
  Logger.log("✅ AUTO trigger created: Every 5 minutes");
  Logger.log("🔧 Function: runApprovalWorkflow");
}

/**
 * Create an AUTO trigger that runs every 10 minutes
 */
function createAutoTrigger10Min() {
  deleteExistingTriggers();
  setAutoTrigger(10);
  
  ScriptApp.newTrigger("runApprovalWorkflow")
    .timeBased()
    .everyMinutes(10)
    .create();
  
  Logger.log("✅ AUTO trigger created: Every 10 minutes");
  Logger.log("🔧 Function: runApprovalWorkflow");
}

/**
 * Create an AUTO trigger that runs every 15 minutes
 */
function createAutoTrigger15Min() {
  deleteExistingTriggers();
  setAutoTrigger(15);
  
  ScriptApp.newTrigger("runApprovalWorkflow")
    .timeBased()
    .everyMinutes(15)
    .create();
  
  Logger.log("✅ AUTO trigger created: Every 15 minutes");
  Logger.log("🔧 Function: runApprovalWorkflow");
}

/**
 * Create an AUTO trigger that runs every 20 minutes
 */
function createAutoTrigger20Min() {
  deleteExistingTriggers();
  setAutoTrigger(20);
  
  ScriptApp.newTrigger("runApprovalWorkflow")
    .timeBased()
    .everyMinutes(20)
    .create();
  
  Logger.log("✅ AUTO trigger created: Every 20 minutes");
  Logger.log("🔧 Function: runApprovalWorkflow");
}

// ============================================
// MANUAL TRIGGER SETUP
// ============================================

/**
 * Set up MANUAL mode (no automatic triggers)
 * Data only routes when explicitly confirmed
 */
function setupManualMode() {
  deleteExistingTriggers();
  setManualTrigger();
  
  Logger.log("✅ MANUAL mode activated");
  Logger.log("📝 How to use:");
  Logger.log("   1. Users check confirmation boxes in their department sheet");
  Logger.log("   2. Data automatically routes to next department on confirmation");
  Logger.log("   3. Or manually run: triggerManualWorkflow()");
}

/**
 * Manually trigger the workflow (use with MANUAL mode)
 * Run this function whenever you want to process approvals
 */
function manualTriggerWorkflow() {
  Logger.log("🔄 Manual trigger initiated...");
  triggerManualWorkflow();
  Logger.log("✅ Manual workflow completed");
}

// ============================================
// TRIGGER MANAGEMENT
// ============================================

/**
 * Delete all existing triggers
 * Run this before creating new triggers
 */
function deleteExistingTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  if (triggers.length === 0) {
    Logger.log("ℹ️  No existing triggers found");
    return;
  }
  
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  
  Logger.log(`🗑️  Deleted ${triggers.length} existing trigger(s)`);
}

/**
 * List all active triggers
 */
function listActiveTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  if (triggers.length === 0) {
    Logger.log("ℹ️  No active triggers");
    return;
  }
  
  Logger.log(`\n📋 Active Triggers (${triggers.length} total):`);
  
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    Logger.log(`\n  Trigger ${i + 1}:`);
    Logger.log(`    Function: ${trigger.getHandlerFunction()}`);
    Logger.log(`    Event Type: ${trigger.getTriggerSource()}`);
    Logger.log(`    Source: ${trigger.getTriggerSourceId()}`);
  }
}

/**
 * Display current trigger configuration
 */
function displayTriggerConfig() {
  const config = getTriggerConfig();
  
  Logger.log("\n=== TRIGGER CONFIGURATION ===");
  Logger.log(`Mode: ${config.mode}`);
  Logger.log(`Description: ${config.description}`);
  Logger.log("\n${config.description}");
}

// ============================================
// QUICK SETUP WIZARD
// ============================================

/**
 * Interactive setup wizard for choosing trigger mode
 * Instructions:
 * 1. Run this function
 * 2. Read the output
 * 3. Run the corresponding function for your choice
 */
function setupWizard() {
  Logger.log("\n╔════════════════════════════════════════════════════════════╗");
  Logger.log("║     SEQUENTIAL DATA APPROVAL WORKFLOW - SETUP WIZARD       ║");
  Logger.log("╚════════════════════════════════════════════════════════════╝");
  
  Logger.log("\n📌 STEP 1: Choose Your Trigger Mode\n");
  
  Logger.log("Option A: AUTO MODE (Automatic routing on schedule)");
  Logger.log("──────────────────────────────────────────────────");
  Logger.log("✓ Data automatically routes every N minutes");
  Logger.log("✓ Best for: Batch processing, scheduled approvals");
  Logger.log("✓ Choose interval: 5, 10, 15, or 20 minutes");
  Logger.log("\nTo use AUTO mode, run ONE of these functions:");
  Logger.log("  • createAutoTrigger5Min()   → Every 5 minutes");
  Logger.log("  • createAutoTrigger10Min()  → Every 10 minutes");
  Logger.log("  • createAutoTrigger15Min()  → Every 15 minutes");
  Logger.log("  • createAutoTrigger20Min()  → Every 20 minutes");
  
  Logger.log("\n\nOption B: MANUAL MODE (On-demand routing)");
  Logger.log("──────────────────────────────────────────────────");
  Logger.log("✓ Data routes immediately when confirmed");
  Logger.log("✓ Best for: Real-time approvals, ad-hoc processing");
  Logger.log("✓ No scheduled triggers needed");
  Logger.log("\nTo use MANUAL mode, run this function:");
  Logger.log("  • setupManualMode()");
  Logger.log("\nThen data will route when:");
  Logger.log("  1. Users check confirmation boxes in their sheet");
  Logger.log("  2. OR manually run: manualTriggerWorkflow()");
  
  Logger.log("\n\n📌 STEP 2: After Setup\n");
  Logger.log("To verify your setup, run:");
  Logger.log("  • displayTriggerConfig()  → Show current configuration");
  Logger.log("  • listActiveTriggers()    → Show all active triggers");
  Logger.log("  • validateConfig()        → Verify sheet structure");
  
  Logger.log("\n\n📌 STEP 3: Test Your Workflow\n");
  Logger.log("Run this function to add sample test data:");
  Logger.log("  • testWorkflowWithSampleData()");
  Logger.log("\nThen test by confirming records in Department 1");
  
  Logger.log("\n\n════════════════════════════════════════════════════════════");
}

// ============================================
// TROUBLESHOOTING HELPERS
// ============================================

/**
 * Verify trigger mode matches configuration
 */
function verifyTriggerMode() {
  const config = getTriggerConfig();
  const triggers = ScriptApp.getProjectTriggers();
  
  Logger.log("\n=== TRIGGER MODE VERIFICATION ===");
  Logger.log(`Configured Mode: ${config.mode}`);
  Logger.log(`Active Triggers: ${triggers.length}`);
  
  if (config.mode === "AUTO" && triggers.length === 0) {
    Logger.log("\n⚠️  WARNING: AUTO mode is configured but no triggers exist!");
    Logger.log("   Run: createAutoTrigger5Min() (or 10/15/20)");
  } else if (config.mode === "MANUAL" && triggers.length > 0) {
    Logger.log("\n⚠️  WARNING: MANUAL mode is configured but triggers exist!");
    Logger.log("   Run: deleteExistingTriggers()");
  } else {
    Logger.log("\n✅ Trigger mode matches configuration");
  }
}

/**
 * Complete diagnostic report
 */
function runDiagnostics() {
  Logger.log("\n╔════════════════════════════════════════════════════════════╗");
  Logger.log("║           WORKFLOW SYSTEM - DIAGNOSTIC REPORT             ║");
  Logger.log("╚════════════════════════════════════════════════════════════╝");
  
  Logger.log("\n📋 Configuration:");
  displayTriggerConfig();
  
  Logger.log("\n📋 Trigger Status:");
  listActiveTriggers();
  
  Logger.log("\n📋 Workflow Statistics:");
  printWorkflowStats();
  
  Logger.log("\n📋 Verification:");
  verifyTriggerMode();
  
  try {
    validateConfig();
    Logger.log("\n✅ All checks passed!");
  } catch (error) {
    Logger.log(`\n❌ Error: ${error.message}`);
  }
}

// ============================================
// SCHEDULE HELPERS
// ============================================

/**
 * Get recommended interval based on data volume
 */
function getRecommendedInterval(estimatedRecordsPerDay) {
  if (estimatedRecordsPerDay < 50) {
    return 20; // Low volume: check every 20 minutes
  } else if (estimatedRecordsPerDay < 200) {
    return 15; // Medium volume: check every 15 minutes
  } else if (estimatedRecordsPerDay < 500) {
    return 10; // High volume: check every 10 minutes
  } else {
    return 5;  // Very high volume: check every 5 minutes
  }
}

/**
 * Display schedule recommendations
 */
function showScheduleRecommendations() {
  Logger.log("\n=== TRIGGER INTERVAL RECOMMENDATIONS ===\n");
  
  Logger.log("Data Volume          → Recommended Interval");
  Logger.log("─────────────────────────────────────────────");
  Logger.log("< 50 records/day      → Every 20 minutes");
  Logger.log("50-200 records/day    → Every 15 minutes");
  Logger.log("200-500 records/day   → Every 10 minutes");
  Logger.log("> 500 records/day     → Every 5 minutes");
  
  Logger.log("\nReal-time approvals  → Use MANUAL mode");
  Logger.log("\nHeavy batch approvals → Use AUTO mode + 20 min interval");
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Disable all triggers temporarily
 * Useful for maintenance or testing
 */
function disableAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  if (triggers.length === 0) {
    Logger.log("ℹ️  No triggers to disable");
    return;
  }
  
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  
  Logger.log(`✅ Disabled ${triggers.length} trigger(s)`);
  Logger.log("⚠️  Workflow is now paused");
  Logger.log("To re-enable, run: createAutoTrigger5Min() (or other interval)");
}

/**
 * Get trigger statistics
 */
function getTriggerStats() {
  const triggers = ScriptApp.getProjectTriggers();
  const config = getTriggerConfig();
  
  const stats = {
    mode: config.mode,
    triggerCount: triggers.length,
    interval: config.interval,
    lastRun: new Date(),
    status: triggers.length > 0 ? "Active" : "Inactive"
  };
  
  Logger.log("\n=== TRIGGER STATISTICS ===");
  Logger.log(`Mode: ${stats.mode}`);
  Logger.log(`Status: ${stats.status}`);
  Logger.log(`Trigger Count: ${stats.triggerCount}`);
  Logger.log(`Interval: ${stats.interval} minutes`);
  
  return stats;
}
