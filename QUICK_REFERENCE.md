# ⚡ QUICK REFERENCE GUIDE
## Sequential Data Approval Workflow System

**Print this page for quick lookup while using the system**

---

## 🚀 QUICK START (5 MINUTES)

### Step 1: Create Sheet Structure
```
1. Create Google Sheet named: "Sequential Data Approval Workflow"
2. Create tabs:
   - Department 1 Queue
   - Department 2 Queue
   - Department 3 Queue
   - Department 4 Archive
```

### Step 2: Add Headers
**All sheets, Row 1:**
- ID
- Data Field 1, Data Field 2
- Dept#_Confirmed (checkbox)
- Dept#_Timestamp (date/time)
- Dept#_Processed (checkbox)
- Notes

### Step 3: Deploy Script
1. Tools → Script Editor
2. Add 3 files: `config.gs`, `main.gs`, `triggers.gs`
3. Save all files (Ctrl+S)

### Step 4: Choose Trigger Mode
```javascript
AUTO:    setAutoTrigger(5)      // Every 5 minutes
MANUAL:  setManualTrigger()     // On confirmation
```

### Step 5: Test
```javascript
testWorkflowWithSampleData()
```

---

## 🎯 DAILY OPERATIONS

### User Workflow (Department Approvers)

1. **Open Your Department Sheet**
   - Find your department tab
   - See pending records

2. **Review Data**
   - Check data quality
   - Add notes if needed

3. **Confirm Record**
   - Check the `Dept#_Confirmed` checkbox ✓
   - Timestamp auto-fills
   - Data moves to next department

4. **Wait for Next Stage**
   - Record disappears from your sheet
   - Appears in next department's sheet

### Admin Workflow (System Manager)

1. **Monitor Progress**
   ```javascript
   printWorkflowStats()
   ```

2. **Export Statistics**
   ```javascript
   exportStatsToSheet()
   ```

3. **View Logs** (Apps Script)
   - Ctrl+Enter to see execution logs
   - Check for errors/warnings

4. **Handle Issues**
   - See TROUBLESHOOTING.md
   - Run diagnostics if needed

---

## 📋 COLUMN REFERENCE

| Column | Purpose | Format | Filled By |
|--------|---------|--------|-----------|
| ID | Record identifier | Text | User |
| Data Field 1-N | Your data | Text/Number | User |
| Dept#_Confirmed | Approval checkbox | Checkbox | Department |
| Dept#_Timestamp | Approval time | Date/Time | System |
| Dept#_Processed | Routing flag | Checkbox | System |
| Notes | Comments | Text | Any |
| Final_Approved | Final approval | Checkbox | System |
| Approval_Chain | Route taken | Text | System |

---

## 🔌 TRIGGER MODE COMPARISON

| Feature | AUTO | MANUAL |
|---------|------|--------|
| **Automatic?** | Yes (every N min) | No (on-demand) |
| **Speed** | Delayed | Instant |
| **Best For** | Batch processing | Real-time approvals |
| **Setup** | createAutoTrigger5Min() | setManualTrigger() |
| **Confirm To Route?** | No | Yes |

---

## 🎮 KEY FUNCTIONS

### Setup Functions
```javascript
createAutoTrigger5Min()      // Auto every 5 min
createAutoTrigger10Min()     // Auto every 10 min
createAutoTrigger15Min()     // Auto every 15 min
createAutoTrigger20Min()     // Auto every 20 min
setupManualMode()            // Manual mode
```

### Monitoring Functions
```javascript
printWorkflowStats()         // Show statistics
exportStatsToSheet()         // Create stats sheet
getTriggerConfig()           // Show current mode
listActiveTriggers()         // Show all triggers
runDiagnostics()             // Full system check
```

### Testing Functions
```javascript
testWorkflowWithSampleData() // Add test records
validateConfig()             // Verify setup
```

### Admin Functions
```javascript
triggerManualWorkflow()      // Run workflow now
resetProcessedFlags()        // Clear all "processed"
deleteExistingTriggers()     // Remove all triggers
```

---

## ⚠️ COMMON MISTAKES

| Mistake | Fix |
|---------|-----|
| Confirmation not checked | Click checkbox to ✓ |
| Data not moving | Run `triggerManualWorkflow()` |
| Wrong sheet names | Use exact names from setup guide |
| Missing timestamps | Format column as Date/Time |
| Duplicate records | Run `resetProcessedFlags()` |
| No triggers running | Run `createAutoTrigger5Min()` |

---

## 🔍 TROUBLESHOOTING CHECKLIST

- [ ] Confirm checkbox is ✓ (TRUE, not just checked)
- [ ] Column names are EXACT (case-sensitive)
- [ ] Headers in Row 1 (not Row 2)
- [ ] Trigger mode matches your config
- [ ] Time-based trigger exists (if AUTO mode)
- [ ] Timestamp columns formatted as Date/Time
- [ ] Sheet names match exactly
- [ ] Authorization given to script
- [ ] No duplicate triggers running

**Still stuck?** Run: `runDiagnostics()`

---

## 📊 WORKFLOW STAGES

```
Department 1 Queue
    ↓ (confirm)
Department 2 Queue
    ↓ (confirm)
Department 3 Queue
    ↓ (confirm)
Department 4 Archive ← Final & Complete
```

Each stage only sees records confirmed by previous stage.

---

## 🔐 PERMISSIONS MODEL

| Department | Access | Can See | Can Confirm |
|------------|--------|---------|------------|
| Dept 1 | Editor | Dept 1 Queue | ✓ Yes |
| Dept 2 | Editor | Dept 2 Queue | ✓ Yes |
| Dept 3 | Editor | Dept 3 Queue | ✓ Yes |
| Dept 4 | Viewer | Dept 4 Archive | ✗ No |
| Admin | Editor | All sheets | Can run functions |

---

## ⏱️ TIMING EXPECTATIONS

| Trigger Mode | Data Move Time | When To Use |
|--------------|----------------|------------|
| AUTO - 5 min | Up to 5 min | Fast processing |
| AUTO - 10 min | Up to 10 min | Normal processing |
| AUTO - 15 min | Up to 15 min | Batch processing |
| AUTO - 20 min | Up to 20 min | Large batches |
| MANUAL | Instant | Real-time approvals |

---

## 📝 CONFIGURATION QUICK EDIT

**File: `config.gs`**

```javascript
// Change trigger mode
triggerMode: "AUTO",           // or "MANUAL"

// Change auto interval
autoTriggerInterval: 5,        // 5, 10, 15, or 20

// Change admin email
adminEmail: "admin@example.com",

// Enable/disable notifications
enableNotifications: true,     // or false

// Enable/disable logging
enableLogging: true,           // or false
```

**After editing:** Press Ctrl+S to save

---

## 🎓 TYPICAL WORKFLOW SEQUENCE

### Day 1: Setup (15 min)
1. Create Google Sheet with tabs
2. Add column headers
3. Deploy Apps Script files
4. Choose trigger mode
5. Test with sample data

### Day 2+: Daily Operations
1. Users enter data in Dept 1
2. Dept 1 reviews & confirms ✓
3. Auto/manual trigger routes to Dept 2
4. Dept 2 reviews & confirms ✓
5. Continues through all stages
6. Final approved data in Dept 4 Archive

### Weekly: Maintenance
1. Monitor stats: `printWorkflowStats()`
2. Backup sheet: File → Version history
3. Archive old records (if needed)
4. Check logs for errors

---

## 🆘 EMERGENCY CONTACTS

### If Script Breaks
```javascript
// Step 1: Check what's wrong
runDiagnostics()

// Step 2: Reset
resetProcessedFlags()
deleteExistingTriggers()

// Step 3: Restore trigger
createAutoTrigger5Min()  // or your preferred interval
```

### If Data Disappears
```javascript
// Check Department 4 Archive first
// If not there, restore from version history:
// File → Version history → Restore
```

### If Stuck
```javascript
// Run full diagnostic
runDiagnostics()

// Then check TROUBLESHOOTING.md
```

---

## 📞 SUPPORT COMMANDS

```javascript
// Get help
setupWizard()              // Interactive setup help

// Check status
getTriggerConfig()         // Current configuration
listActiveTriggers()       // All active triggers
printWorkflowStats()       // Real-time statistics

// Troubleshoot
validateConfig()           // Verify setup
runDiagnostics()          // Full system check

// Test
testWorkflowWithSampleData()  // Add test records
```

---

## 💡 PRO TIPS

1. **Add notes to records**
   - Use Notes column to explain approvals
   - Helps with auditing later

2. **Review weekly stats**
   - Run `exportStatsToSheet()` weekly
   - Track completion rates
   - Spot bottlenecks

3. **Keep sheets clean**
   - Archive completed records monthly
   - Delete test data
   - Maintain < 500 active rows

4. **Backup before changes**
   - File → Version history → Save a copy
   - Before editing config
   - Before major changes

5. **Use MANUAL for urgent approvals**
   - Switch to MANUAL mode for fast-track items
   - Switch back to AUTO after

---

**Last Updated:** 2026-09-11  
**Version:** 1.0.0

For detailed help: See [SETUP_GUIDE.md](SETUP_GUIDE.md) | [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
