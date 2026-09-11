# 📚 API & FUNCTIONS REFERENCE
## Sequential Data Approval Workflow System

Complete reference for all available functions and their usage.

---

## 🎯 FUNCTION CATEGORIES

1. **Setup & Configuration** - Initial setup and configuration
2. **Workflow Execution** - Running the approval workflow
3. **Monitoring & Diagnostics** - Checking system health
4. **Trigger Management** - Managing automation triggers
5. **Data Management** - Manipulating workflow data
6. **Testing** - Testing and validation functions
7. **Admin Utilities** - Administrative operations

---

## 🔧 SETUP & CONFIGURATION FUNCTIONS

### `setupWizard()`
**Purpose:** Interactive setup wizard to guide initial configuration

**Parameters:** None

**Returns:** Prints setup steps to logs

**Usage:**
```javascript
setupWizard()
```

**What it does:**
- Guides you through all setup steps
- Validates sheet structure
- Configures trigger mode
- Tests connections
- Displays setup summary

**Best for:** First-time setup

---

### `validateConfig()`
**Purpose:** Verify all configuration is correct

**Parameters:** None

**Returns:** Validation report in logs

**Usage:**
```javascript
validateConfig()
```

**What it does:**
- Checks all sheet names exist
- Verifies column headers match
- Validates column formats
- Reports any issues found
- Suggests fixes

**Best for:** Troubleshooting setup issues

---

### `getTriggerConfig()`
**Purpose:** Display current trigger configuration

**Parameters:** None

**Returns:** Config object logged to console

**Usage:**
```javascript
getTriggerConfig()
```

**Output Example:**
```
Trigger Mode: AUTO
Auto Interval: 5 minutes
Next Run: 2:45 PM
Admin Email: admin@example.com
Notifications: Enabled
Logging: Enabled
```

**Best for:** Checking current settings

---

### `printConfig()`
**Purpose:** Print all configuration values

**Parameters:** None

**Returns:** Full config details in logs

**Usage:**
```javascript
printConfig()
```

**What it shows:**
- Trigger mode (AUTO/MANUAL)
- Trigger interval (if AUTO)
- All column names per department
- Sheet names
- Email settings
- Feature flags

---

## ▶️ WORKFLOW EXECUTION FUNCTIONS

### `runApprovalWorkflow()`
**Purpose:** Execute the complete approval workflow once

**Parameters:** None

**Returns:** Number of records processed

**Usage:**
```javascript
runApprovalWorkflow()
```

**What it does:**
1. Reads confirmed records from Dept 1
2. Routes to Dept 2
3. Reads confirmed records from Dept 2
4. Routes to Dept 3
5. Reads confirmed records from Dept 3
6. Routes to Dept 4 Archive
7. Logs all transfers
8. Clears processed flags

**Returns:**
```
{
  "dept1_to_dept2": 5,
  "dept2_to_dept3": 3,
  "dept3_to_dept4": 2,
  "total": 10
}
```

**Best for:** AUTO mode or manual execution

---

### `triggerManualWorkflow()`
**Purpose:** Manually trigger the workflow immediately

**Parameters:** None

**Returns:** Workflow execution result

**Usage:**
```javascript
triggerManualWorkflow()
```

**When to use:**
- In MANUAL mode when user confirms checkbox
- To force workflow run outside normal schedule
- To test workflow execution

**Alias:** Can be called from onEdit trigger in MANUAL mode

---

## 📊 MONITORING & DIAGNOSTICS FUNCTIONS

### `printWorkflowStats()`
**Purpose:** Display current workflow statistics

**Parameters:** None

**Returns:** Statistics logged to console

**Usage:**
```javascript
printWorkflowStats()
```

**Output Example:**
```
=== WORKFLOW STATISTICS ===
Department 1 Queue: 12 pending records
Department 2 Queue: 5 pending records
Department 3 Queue: 2 pending records
Department 4 Archive: 145 completed records

Recent Transfers (last 7 days):
- Dept1→Dept2: 87 records
- Dept2→Dept3: 62 records
- Dept3→Dept4: 45 records

Average Processing Time: 2.4 hours
Success Rate: 99.2%
```

**Best for:** Weekly monitoring, performance review

---

### `exportStatsToSheet()`
**Purpose:** Export statistics to a new sheet for analysis

**Parameters:** None

**Returns:** Creates "Workflow Statistics" sheet

**Usage:**
```javascript
exportStatsToSheet()
```

**Creates:**
- New sheet named "Workflow Statistics"
- Daily statistics table
- Charts and graphs
- Trend analysis
- Performance metrics

**Best for:** Historical tracking, reporting

---

### `runDiagnostics()`
**Purpose:** Complete system health check

**Parameters:** None

**Returns:** Diagnostic report in logs

**Usage:**
```javascript
runDiagnostics()
```

**Checks:**
- ✓ All sheet names
- ✓ All column headers
- ✓ Column formatting
- ✓ Trigger configuration
- ✓ Active triggers
- ✓ Sample data integrity
- ✓ Script permissions
- ✓ Google Sheets API access

**Output:** Red X (✗) for any issues, green checkmark (✓) for success

**Best for:** Troubleshooting, pre-launch verification

---

### `listActiveTriggers()`
**Purpose:** List all active App Script triggers

**Parameters:** None

**Returns:** Array of trigger objects

**Usage:**
```javascript
listActiveTriggers()
```

**Output Example:**
```
Active Triggers:
1. runApprovalWorkflow - Every 5 minutes (enabled)
2. onEdit - Installed (enabled)
```

**Best for:** Verifying triggers exist, checking for duplicates

---

## ⏰ TRIGGER MANAGEMENT FUNCTIONS

### `createAutoTrigger5Min()`
**Purpose:** Create trigger for 5-minute intervals

**Parameters:** None

**Returns:** Trigger ID

**Usage:**
```javascript
createAutoTrigger5Min()
```

**When to use:** Fast processing, real-time needs

---

### `createAutoTrigger10Min()`
**Purpose:** Create trigger for 10-minute intervals

**Parameters:** None

**Returns:** Trigger ID

**Usage:**
```javascript
createAutoTrigger10Min()
```

**When to use:** Standard processing speed

---

### `createAutoTrigger15Min()`
**Purpose:** Create trigger for 15-minute intervals

**Parameters:** None

**Returns:** Trigger ID

**Usage:**
```javascript
createAutoTrigger15Min()
```

**When to use:** Batch processing, medium volume

---

### `createAutoTrigger20Min()`
**Purpose:** Create trigger for 20-minute intervals

**Parameters:** None

**Returns:** Trigger ID

**Usage:**
```javascript
createAutoTrigger20Min()
```

**When to use:** Large batch processing, off-peak hours

---

### `setupManualMode()`
**Purpose:** Configure system for MANUAL trigger mode

**Parameters:** None

**Returns:** Configuration updated

**Usage:**
```javascript
setupManualMode()
```

**What it does:**
1. Sets `triggerMode: "MANUAL"` in config
2. Installs onEdit trigger
3. Disables all time-based triggers
4. Logs setup completion

**When to use:** Real-time approvals, on-demand processing

---

### `deleteExistingTriggers()`
**Purpose:** Remove all time-based triggers

**Parameters:** None

**Returns:** Number of triggers deleted

**Usage:**
```javascript
deleteExistingTriggers()
```

**Warning:** Deletes ALL triggers except onEdit (MANUAL mode)

**When to use:**
- Before recreating triggers
- When switching trigger modes
- To reset broken triggers

---

## 🗂️ DATA MANAGEMENT FUNCTIONS

### `transferRecordsToDept(sourceSheet, targetSheet)`
**Purpose:** Transfer confirmed records from one department to next

**Parameters:**
- `sourceSheet` (string): Source sheet name
- `targetSheet` (string): Target sheet name

**Returns:** Number of records transferred

**Usage:**
```javascript
transferRecordsToDept("Department 1 Queue", "Department 2 Queue")
```

**What it does:**
1. Finds all rows where `Dept#_Confirmed` = TRUE
2. Checks if `Dept#_Processed` = FALSE (not yet transferred)
3. Copies entire row to target sheet
4. Marks `Dept#_Processed` = TRUE
5. Adds timestamp
6. Logs transfer details

---

### `resetProcessedFlags()`
**Purpose:** Clear all "processed" flags from all sheets

**Parameters:** None

**Returns:** Number of flags reset

**Usage:**
```javascript
resetProcessedFlags()
```

**Warning:** Use only for testing or if workflow is stuck

**What it does:**
- Unchecks all `Dept#_Processed` checkboxes
- Allows records to be re-processed
- Useful for fixing duplicate issues

---

### `clearSheet(sheetName)`
**Purpose:** Delete all data from a sheet (keeps headers)

**Parameters:**
- `sheetName` (string): Sheet to clear

**Returns:** Number of rows deleted

**Usage:**
```javascript
clearSheet("Department 2 Queue")
```

**Warning:** Cannot be undone. Use with caution.

---

### `archiveCompletedRecords()`
**Purpose:** Move completed records to archive

**Parameters:** None

**Returns:** Number of records archived

**Usage:**
```javascript
archiveCompletedRecords()
```

**What it does:**
- Finds records with all approvals completed
- Moves to Department 4 Archive
- Marks as Final_Processed
- Removes from active queues

---

## 🧪 TESTING FUNCTIONS

### `testWorkflowWithSampleData()`
**Purpose:** Add sample test records and run workflow

**Parameters:** None

**Returns:** Test results

**Usage:**
```javascript
testWorkflowWithSampleData()
```

**What it does:**
1. Adds 5 sample records to Department 1
2. Auto-confirms them
3. Runs workflow
4. Verifies data flows through all departments
5. Reports success/failure
6. (Optional) Removes test data

**Output:**
```
✓ Added 5 test records
✓ Dept1→Dept2: 5 records
✓ Dept2→Dept3: 5 records
✓ Dept3→Dept4: 5 records
✓ All tests passed!
```

**Best for:** Verifying setup works correctly

---

### `validateDataIntegrity()`
**Purpose:** Check for data corruption or inconsistencies

**Parameters:** None

**Returns:** Validation report

**Usage:**
```javascript
validateDataIntegrity()
```

**Checks:**
- Duplicate IDs
- Missing required fields
- Invalid approval sequences
- Timestamp inconsistencies
- Data type mismatches

---

## 👨‍💼 ADMIN UTILITIES

### `sendNotification(message, email)`
**Purpose:** Send notification email to admin

**Parameters:**
- `message` (string): Notification text
- `email` (string): Recipient email (optional, uses config default)

**Returns:** true if sent successfully

**Usage:**
```javascript
sendNotification("Workflow completed: 42 records processed", "admin@example.com")
```

**When used:**
- Workflow completion notifications
- Error alerts
- Status updates

---

### `getWorkflowStatus()`
**Purpose:** Get current status of the workflow

**Parameters:** None

**Returns:** Status object

**Usage:**
```javascript
getWorkflowStatus()
```

**Output Example:**
```
{
  "status": "idle",
  "last_run": "2026-09-11 2:30 PM",
  "next_run": "2026-09-11 2:35 PM",
  "trigger_mode": "AUTO",
  "pending_records": 12,
  "errors": 0
}
```

---

### `enableLogging()`
**Purpose:** Enable detailed logging for debugging

**Parameters:** None

**Returns:** Logging enabled

**Usage:**
```javascript
enableLogging()
```

**What it logs:**
- Every function call
- All data transfers
- Errors and warnings
- Performance metrics
- Timestamps

---

### `disableLogging()`
**Purpose:** Disable logging to reduce output noise

**Parameters:** None

**Returns:** Logging disabled

**Usage:**
```javascript
disableLogging()
```

---

### `exportLogs(filename)`
**Purpose:** Export execution logs to Google Drive

**Parameters:**
- `filename` (string): Name for exported file

**Returns:** File ID

**Usage:**
```javascript
exportLogs("Workflow_Logs_2026-09-11")
```

**Creates:** Text file in your Google Drive with full execution logs

---

## 🔐 PERMISSION & SHARING FUNCTIONS

### `setDepartmentPermissions(departmentNumber, email, accessLevel)`
**Purpose:** Configure permissions for a department

**Parameters:**
- `departmentNumber` (number): 1, 2, 3, or 4
- `email` (string): User email
- `accessLevel` (string): "editor" or "viewer"

**Returns:** Permission set

**Usage:**
```javascript
setDepartmentPermissions(1, "dept1@example.com", "editor")
setDepartmentPermissions(4, "archive@example.com", "viewer")
```

---

### `getPermissionsSummary()`
**Purpose:** Show current permission configuration

**Parameters:** None

**Returns:** Permission matrix logged

**Usage:**
```javascript
getPermissionsSummary()
```

**Output:**
```
Department 1: dept1@example.com (Editor)
Department 2: dept2@example.com (Editor)
Department 3: dept3@example.com (Editor)
Department 4: archive@example.com (Viewer)
```

---

## 📈 REPORTING FUNCTIONS

### `generateDailyReport()`
**Purpose:** Create daily workflow summary report

**Parameters:** None

**Returns:** Report object

**Usage:**
```javascript
generateDailyReport()
```

**Generates:**
- Records processed per department
- Approval times
- Bottleneck analysis
- Error summary
- Performance metrics

---

### `generateWeeklyReport()`
**Purpose:** Create weekly workflow summary report

**Parameters:** None

**Returns:** Report object

**Usage:**
```javascript
generateWeeklyReport()
```

**Includes:**
- Weekly statistics
- Trend analysis
- Top performers
- Problem areas
- Recommendations

---

### `exportToCSV(sheetName, filename)`
**Purpose:** Export sheet data to CSV file

**Parameters:**
- `sheetName` (string): Sheet to export
- `filename` (string): CSV filename

**Returns:** File ID

**Usage:**
```javascript
exportToCSV("Department 4 Archive", "Archive_2026-09")
```

---

## 🔍 DEBUGGING FUNCTIONS

### `debugMode(enabled)`
**Purpose:** Enable/disable debug mode

**Parameters:**
- `enabled` (boolean): true to enable, false to disable

**Returns:** Debug mode status

**Usage:**
```javascript
debugMode(true)   // Enable detailed output
debugMode(false)  // Disable debug output
```

**When enabled:**
- All logs printed to console
- Detailed execution timestamps
- Variable inspection
- Function call stack
- Performance profiling

---

### `getExecutionLog(limit)`
**Purpose:** Retrieve recent execution logs

**Parameters:**
- `limit` (number): Number of recent logs to return (default: 50)

**Returns:** Array of log entries

**Usage:**
```javascript
getExecutionLog(100)
```

**Output:** Array with most recent logs first

---

## 🆘 ERROR HANDLING FUNCTIONS

### `getLastError()`
**Purpose:** Retrieve the last error that occurred

**Parameters:** None

**Returns:** Error object

**Usage:**
```javascript
getLastError()
```

**Output Example:**
```
{
  "message": "Column 'Dept1_Confirmed' not found",
  "time": "2026-09-11 2:30 PM",
  "function": "runApprovalWorkflow",
  "severity": "ERROR"
}
```

---

### `clearErrors()`
**Purpose:** Clear all recorded errors

**Parameters:** None

**Returns:** Errors cleared

**Usage:**
```javascript
clearErrors()
```

---

## 📋 FUNCTION QUICK LOOKUP TABLE

| Function | Purpose | Trigger |
|----------|---------|---------|
| `setupWizard()` | Initial setup | Manual |
| `validateConfig()` | Verify configuration | Manual |
| `runApprovalWorkflow()` | Execute workflow | Auto/Manual |
| `triggerManualWorkflow()` | Force workflow run | onEdit |
| `printWorkflowStats()` | Show statistics | Manual |
| `runDiagnostics()` | System health check | Manual |
| `createAutoTrigger5Min()` | Setup 5-min trigger | Manual |
| `deleteExistingTriggers()` | Remove triggers | Manual |
| `testWorkflowWithSampleData()` | Test setup | Manual |
| `exportStatsToSheet()` | Export metrics | Manual |
| `sendNotification()` | Send email alert | Auto/Manual |
| `enableLogging()` | Enable debug logs | Manual |
| `generateDailyReport()` | Daily summary | Manual |

---

## 🎓 COMMON USAGE PATTERNS

### Pattern 1: First-Time Setup
```javascript
setupWizard()
validateConfig()
testWorkflowWithSampleData()
printConfig()
```

### Pattern 2: Daily Monitoring
```javascript
printWorkflowStats()
listActiveTriggers()
getWorkflowStatus()
```

### Pattern 3: Weekly Maintenance
```javascript
generateWeeklyReport()
exportStatsToSheet()
validateDataIntegrity()
archiveCompletedRecords()
```

### Pattern 4: Troubleshooting
```javascript
runDiagnostics()
validateConfig()
getLastError()
enableLogging()
runApprovalWorkflow()
```

### Pattern 5: Reset & Recover
```javascript
deleteExistingTriggers()
resetProcessedFlags()
validateDataIntegrity()
createAutoTrigger5Min()
testWorkflowWithSampleData()
```

---

## 📞 NEED HELP?

- **Setup issues?** → Run `setupWizard()` or `validateConfig()`
- **Workflow problems?** → Run `runDiagnostics()` and `getLastError()`
- **Performance issues?** → Run `printWorkflowStats()` and `generateDailyReport()`
- **Data corruption?** → Run `validateDataIntegrity()` and `resetProcessedFlags()`

---

**Last Updated:** 2026-09-11  
**Version:** 1.0.0

For detailed setup: See [SETUP_GUIDE.md](SETUP_GUIDE.md)  
For troubleshooting: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
