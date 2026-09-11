# 🐛 TROUBLESHOOTING GUIDE
## Sequential Data Approval Workflow System

---

## 🔍 COMMON ISSUES & SOLUTIONS

### Issue 1: "Sheet not found" Error

**Error Message:**
```
Error: Required sheets not found: Department 1 Queue or Department 2 Queue
```

**Causes:**
- Sheet names don't match exactly (case-sensitive)
- Sheets not created in Step 2
- Accidentally deleted a sheet

**Solutions:**

1. **Verify sheet names:**
   - Go to your Google Sheet
   - Check each tab name matches exactly:
     - `Department 1 Queue` (exact spacing & capitalization)
     - `Department 2 Queue`
     - etc.

2. **Recreate missing sheets:**
   - Right-click a tab → "Insert 1 below"
   - Name it exactly as required
   - Add the appropriate column headers (see SETUP_GUIDE.md)

3. **Run validation:**
   - Apps Script Editor → Run → `validateConfig()`
   - Check the logs for which sheets are missing

---

### Issue 2: Data Not Moving Between Departments

**Symptoms:**
- You check a confirmation box, but data doesn't appear in next department
- Processed column remains unchecked

**Causes:**
- Confirmation column is empty/FALSE
- Column names don't match configuration
- Wrong trigger mode selected
- AUTO mode interval hasn't elapsed yet
- MANUAL mode not triggered

**Solutions:**

**Step A: Verify Confirmation was Marked**
1. Go to Department 1 Queue
2. Check that the `Dept1_Confirmed` column has a ✓ (checkmark)
3. Make sure it's formatted as a **Checkbox** (not just text)
   - Select the column → Format → Conditional formatting → Checkbox

**Step B: Check Trigger Mode**
1. Open Apps Script editor → `config.gs`
2. Verify: `triggerMode: "AUTO"` or `"MANUAL"`
3. If AUTO: Wait for the interval (5-20 minutes)
4. If MANUAL: Run `triggerManualWorkflow()` in Apps Script

**Step C: Verify Column Names**
1. Check each sheet has exact column names:
   - `Dept1_Confirmed` (NOT `Dept1_Confirm` or `dept1_confirmed`)
   - Case-sensitive!

2. Run in Apps Script:
   ```javascript
   printConfig()  // Check configured column names
   ```

**Step D: Check the Logs**
1. Apps Script Editor → Ctrl+Enter (or Cmd+Enter on Mac)
2. View "Execution log" at bottom
3. Look for error messages
4. Common log messages:
   - `✓ Transferred ID: ...` → Success
   - `✗ Failed to transfer...` → Problem with that record

---

### Issue 3: "Authorization required" Message

**Error:**
```
Authorization required
You need to authorize this script to run
```

**Solution:**

1. Click **"Review permissions"** when prompted
2. Select your Google Account
3. Click **"Allow"** to grant access
4. Re-run the function

**Why this happens:**
- First time running the script
- You switched Google Accounts
- Authorization expired

---

### Issue 4: Timestamps Not Showing

**Problem:**
- `Dept1_Timestamp` column is empty after confirmation
- Date/time values not appearing

**Solutions:**

1. **Format the timestamp column as Date/Time:**
   - Select the timestamp column (e.g., Column E)
   - Right-click → **Format cells**
   - Choose: **Date time** format
   - Click **Apply**

2. **Verify column name is exact:**
   - Should be: `Dept1_Timestamp`, `Dept2_Timestamp`, etc.
   - Not: `Timestamp`, `Time`, `Dept1_Time`

3. **In MANUAL mode:**
   - Timestamp is added when confirmation box is checked
   - Should appear automatically

4. **In AUTO mode:**
   - Timestamp is added during the workflow run
   - May take up to your interval time to appear

---

### Issue 5: Duplicate Records Appearing

**Problem:**
- Same record appears multiple times in next department
- Data is being copied repeatedly

**Causes:**
- `Dept#_Processed` column is not being marked
- Processed column has wrong name
- Multiple triggers running simultaneously

**Solutions:**

1. **Check Processed Column:**
   - Each sheet should have a `Dept#_Processed` column
   - After routing, this should be checked ✓
   - If empty, it will re-route on next run

2. **Reset and Re-test:**
   ```javascript
   // In Apps Script:
   resetProcessedFlags()  // Clears all "processed" marks
   ```
   Then test again with fresh data

3. **Prevent Duplicate Triggers:**
   - Go to Apps Script → Triggers (left sidebar)
   - Delete any duplicate triggers
   - Run: `deleteExistingTriggers()`
   - Re-create a single trigger with correct interval

---

### Issue 6: Manual Mode Not Working

**Problem:**
- Checking confirmation box doesn't trigger routing
- MANUAL mode feels inactive

**Causes:**
- `triggerMode` is set to "AUTO" instead of "MANUAL"
- onEdit trigger is not enabled
- Need to refresh sheet

**Solutions:**

1. **Verify MANUAL mode is active:**
   ```javascript
   // In Apps Script, run:
   getTriggerConfig()  // Should show: "Mode: MANUAL"
   ```

2. **Check configuration:**
   - Open `config.gs`
   - Find: `triggerMode: "MANUAL"`
   - Save the file

3. **Test onEdit (confirmation):**
   - Go to any department sheet
   - Click on a confirmation checkbox
   - Wait 2-3 seconds
   - Check the Execution log for activity

4. **Manual trigger as fallback:**
   ```javascript
   // If onEdit doesn't work, run this manually:
   triggerManualWorkflow()
   ```

---

### Issue 7: AUTO Mode Not Triggering

**Problem:**
- In AUTO mode, workflow doesn't run automatically
- Workflow only runs when manually triggered

**Causes:**
- No time-based trigger created
- Trigger was deleted
- Trigger has an error

**Solutions:**

1. **Check if trigger exists:**
   ```javascript
   // In Apps Script, run:
   listActiveTriggers()
   ```
   Should show at least 1 trigger

2. **Create the trigger:**
   ```javascript
   // Choose one based on your interval:
   createAutoTrigger5Min()   // Every 5 minutes
   createAutoTrigger10Min()  // Every 10 minutes
   createAutoTrigger15Min()  // Every 15 minutes
   createAutoTrigger20Min()  // Every 20 minutes
   ```

3. **Verify trigger settings:**
   - Apps Script → Triggers (left sidebar)
   - Check that "runApprovalWorkflow" is listed
   - Check interval matches your config

4. **Wait for next interval:**
   - Triggers run on Google's schedule
   - May take up to the full interval before first run
   - (e.g., if 5 minutes: wait up to 5 min)

---

### Issue 8: "Column not found" Error

**Error:**
```
Error: Column 'ID' or 'Dept1_Confirmed' not found
```

**Causes:**
- Missing column headers
- Column headers misspelled
- Headers in wrong row (not Row 1)

**Solutions:**

1. **Verify headers are in Row 1:**
   - First row of each sheet should have all column names
   - Not in Row 2 or below

2. **Check exact spelling:**
   - `ID` (not `id`, `Id`, or `ID #`)
   - `Dept1_Confirmed` (not `Dept1Confirmed` or `Dept1_Confirm`)
   - `Dept1_Timestamp` (not `Dept1_Time`)
   - `Dept1_Processed` (not `Dept1_Processor`)

3. **Add missing columns:**
   - If a column is missing, insert it
   - Make sure it has the correct header name in Row 1

4. **Run validation:**
   ```javascript
   validateConfig()
   ```

---

### Issue 9: High Memory Usage / Script Timing Out

**Problem:**
- Script runs very slowly
- "Execution timed out" error
- Script stops in the middle

**Causes:**
- Too many records (1000+ rows)
- Large data cells (images, huge text)
- Multiple triggers running
- Network issues

**Solutions:**

1. **Increase trigger interval:**
   - Change from 5 min to 10-20 min
   - Edit `config.gs` → `autoTriggerInterval: 20`

2. **Archive old data:**
   - Move completed records to archive
   - Keep active sheets lean (< 500 rows)

3. **Optimize sheet structure:**
   - Remove unnecessary columns
   - Delete completed test records

4. **Check for data bottlenecks:**
   - Avoid very large text in cells
   - Remove images/attachments from approval sheets

5. **Monitor script execution:**
   ```javascript
   // See which step is timing out:
   printWorkflowStats()
   ```

---

### Issue 10: Permissions Error

**Error:**
```
You do not have permission to access this sheet
Error: The user does not have permission to call createTrigger
```

**Causes:**
- Shared sheet with limited permissions
- Google Workspace restrictions
- Script is not owned by sheet owner

**Solutions:**

1. **Use Owner Account:**
   - Script must be created/run by the sheet owner
   - If shared, have owner create the script

2. **Check Share Settings:**
   - Sheet → Share (top right)
   - Make sure you have "Editor" access
   - Not just "Viewer"

3. **For Shared Sheets:**
   - Only the owner can create triggers
   - Other users can only confirm records
   - Workflow runs in owner's account

---

## ⚙️ ADVANCED TROUBLESHOOTING

### Debug Log Tips

**Enable detailed logging:**
```javascript
// In config.gs, set:
enableLogging: true
```

**Read the logs:**
1. Apps Script Editor → Press **Ctrl+Enter** (Cmd+Enter on Mac)
2. View the "Execution log" at the bottom
3. Look for:
   - ✅ Green checkmarks = Success
   - ❌ Red X marks = Error
   - 🟠 Orange warnings = Caution

**Log examples:**
```
✓ Transferred ID: TEST-001 to Department 2
✗ Failed to transfer ID TEST-002: Column not found
📊 Dept1→Dept2: Transferred 3 records
```

### Run Diagnostics

Complete system check:
```javascript
runDiagnostics()
```

This will:
- Check trigger configuration
- List all active triggers
- Show workflow statistics
- Validate sheet structure
- Highlight any mismatches

### Manually Test Each Function

Test individual parts:
```javascript
// Test configuration
printConfig()

// Test workflow statistics
printWorkflowStats()

// Test triggering manually
triggerManualWorkflow()

// Test with sample data
testWorkflowWithSampleData()
```

---

## 🔧 RESETTING & RECOVERY

### Complete Reset (Start Over)

**If everything is broken:**

1. **Backup your current sheet:**
   - File → Version history → Save a copy

2. **Reset all processing:**
   ```javascript
   resetProcessedFlags()
   ```

3. **Delete all triggers:**
   ```javascript
   deleteExistingTriggers()
   ```

4. **Clear test data:**
   - Delete all rows with TEST-* IDs
   - Keep only real data

5. **Re-create triggers:**
   - Run: `createAutoTrigger5Min()` (or other interval)
   - Or: `setupManualMode()`

### Recover Lost Data

**If records disappeared:**

1. **Check Department 4 Archive:**
   - Completed records should be there
   - They're in final stage

2. **Check all department queues:**
   - Data might be in intermediate stage
   - Search by ID across sheets

3. **Restore from version history:**
   - File → Version history
   - Find the version before issue occurred
   - Click "Restore"

---

## 📞 NEED MORE HELP?

### Check These First:

1. ✅ Run: `validateConfig()` → Check logs
2. ✅ Run: `runDiagnostics()` → Get full report
3. ✅ Check: Column names (exact spelling, case-sensitive)
4. ✅ Check: Trigger mode matches your usage
5. ✅ Check: Apps Script logs for error messages

### Common Solutions Summary:

| Problem | Quick Fix |
|---------|-----------|
| Sheets not found | Run `validateConfig()` |
| Data not moving | Check confirmation checkbox ✓ |
| No automatic routing | Run `createAutoTrigger5Min()` |
| Timestamps empty | Format as Date/Time |
| Duplicates appearing | Run `resetProcessedFlags()` |
| Manual mode not working | Set `triggerMode: "MANUAL"` |
| Authorization error | Click "Review permissions" → Allow |
| Timeout errors | Increase trigger interval |

---

## 🎓 BEST PRACTICES TO AVOID ISSUES

1. **Test Before Using Live Data**
   - Use sample test data first
   - Verify workflow end-to-end
   - Then add real data

2. **Backup Regularly**
   - File → Version history → Save a copy
   - Do this before major changes

3. **Monitor Logs Weekly**
   - Run `printWorkflowStats()`
   - Look for error patterns
   - Address issues early

4. **Keep Sheets Clean**
   - Archive old records periodically
   - Remove test data
   - Maintain < 500 active rows

5. **Document Your Setup**
   - Note your trigger mode (AUTO/MANUAL)
   - Note your trigger interval (5/10/15/20 min)
   - Keep this in a shared doc

6. **Communicate with Team**
   - Let departments know which sheet they use
   - Explain confirmation process
   - Set expectations for processing time

---

**Last Updated:** 2026-09-11  
**Version:** 1.0.0

For architecture details, see [README.md](README.md)  
For setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
