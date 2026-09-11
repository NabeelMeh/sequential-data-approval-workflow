# 📋 COMPLETE SETUP GUIDE
## Sequential Data Approval Workflow System

**Setup Time: 15-20 minutes**  
**Difficulty Level: Beginner to Intermediate**

---

## 📖 TABLE OF CONTENTS

1. [Pre-Setup Checklist](#pre-setup-checklist)
2. [Step 1: Create Google Sheet](#step-1-create-google-sheet)
3. [Step 2: Create Sheet Tabs](#step-2-create-sheet-tabs)
4. [Step 3: Add Column Headers](#step-3-add-column-headers)
5. [Step 4: Deploy Google Apps Script](#step-4-deploy-google-apps-script)
6. [Step 5: Configure Trigger Mode](#step-5-configure-trigger-mode)
7. [Step 6: Set Up Time-Based Triggers (AUTO mode only)](#step-6-set-up-time-based-triggers)
8. [Step 7: Test the Workflow](#step-7-test-the-workflow)
9. [Step 8: Grant Department Access](#step-8-grant-department-access)
10. [Troubleshooting](#troubleshooting)

---

## ✅ PRE-SETUP CHECKLIST

Before you start, make sure you have:

- [ ] A Google Account (Gmail/Workspace)
- [ ] Access to Google Drive
- [ ] Number of departments confirmed (2-7)
- [ ] List of department names/emails
- [ ] Sample data ready (optional, for testing)

---

## STEP 1: CREATE GOOGLE SHEET

### Instructions:

1. Go to **Google Drive** (drive.google.com)
2. Click **"+ Create"** → **"Google Sheet"**
3. Name it: `Sequential Data Approval Workflow`
4. Click **"Create"**

**Result:** You now have a blank Google Sheet with one default sheet named "Sheet1"

---

## STEP 2: CREATE SHEET TABS

You need to create sheets for each department plus optional archive sheets.

### For 4 Departments Example:

1. Right-click the **"Sheet1"** tab at the bottom
2. Select **"Rename"** and name it: `Department 1 Queue`
3. Right-click → **"Insert 1 below"** and create:
   - `Department 2 Queue`
   - `Department 3 Queue`
   - `Department 4 Archive`

### For More Departments (5-7):

Repeat the above for:
   - `Department 5 Queue`
   - `Department 6 Queue`
   - `Department 7 Archive`

**Note:** The last sheet is always the "Archive" (final destination) sheet.

---

## STEP 3: ADD COLUMN HEADERS

### For Each Department Sheet:

**Department 1 Queue** - Headers (Row 1):

```
A: ID
B: Data Field 1
C: Data Field 2
D: Dept1_Confirmed
E: Dept1_Timestamp
F: Dept1_Processed
G: Notes
```

**Department 2 Queue** - Headers (Row 1):

```
A: ID
B: Data Field 1
C: Data Field 2
D: Dept1_Confirmed
E: Dept1_Timestamp
F: Dept2_Confirmed
G: Dept2_Timestamp
H: Dept2_Processed
I: Notes
```

**Department 3 Queue** - Headers (Row 1):

```
A: ID
B: Data Field 1
C: Data Field 2
D: Dept1_Confirmed
E: Dept1_Timestamp
F: Dept2_Confirmed
G: Dept2_Timestamp
H: Dept3_Confirmed
I: Dept3_Timestamp
J: Dept3_Processed
K: Notes
```

**Department 4 Archive** - Headers (Row 1):

```
A: ID
B: Data Field 1
C: Data Field 2
D: Dept1_Confirmed
E: Dept1_Timestamp
F: Dept2_Confirmed
G: Dept2_Timestamp
H: Dept3_Confirmed
I: Dept3_Timestamp
J: Final_Approved
K: Final_Timestamp
L: Final_Processed
M: Approval_Chain
N: Notes
```

### Quick Format Tips:
- **Confirmation columns** (Dept1_Confirmed, etc.) → Format as **Checkbox**
  - Select column → Format → Conditional formatting → Custom formula: `=TRUE()`
- **Timestamp columns** → Format as **Date/Time**
- **Processed columns** → Format as **Checkbox**

---

## STEP 4: DEPLOY GOOGLE APPS SCRIPT

### 4.1 Open Apps Script Editor:

1. In your Google Sheet, go to **Tools** → **Script Editor**
2. A new tab will open (Google Apps Script editor)
3. Delete the default `myFunction()` code

### 4.2 Copy Code Files:

You now have **3 Google Apps Script files** to copy:

#### File 1: `config.gs`

1. Click **"+ New file"** → **"Script"**
2. Name it: `config.gs`
3. Copy the entire content from `/apps-script/config.gs`
4. Paste it into the editor
5. Press **Ctrl+S** (or **Cmd+S** on Mac) to save

#### File 2: `main.gs`

1. Click **"+ New file"** → **"Script"**
2. Name it: `main.gs`
3. Copy the entire content from `/apps-script/main.gs`
4. Paste it into the editor
5. Press **Ctrl+S** to save

#### File 3: `triggers.gs`

1. Click **"+ New file"** → **"Script"**
2. Name it: `triggers.gs`
3. Copy the entire content from `/apps-script/triggers.gs`
4. Paste it into the editor
5. Press **Ctrl+S** to save

### 4.3 Authorize the Script:

1. In the editor, click **Run** → Select **`validateConfig`** function
2. A popup will appear: **"Authorization required"**
3. Click **"Review permissions"**
4. Select your Google Account
5. Click **"Allow"** to give the script access to your sheet

---

## STEP 5: CONFIGURE TRIGGER MODE

### Choose Your Trigger Mode:

#### OPTION A: AUTO MODE (Recommended for Most Users)

Data automatically routes every N minutes:

1. Open the editor and find the `config.gs` file
2. Edit these lines:

```javascript
const WORKFLOW_CONFIG = {
  triggerMode: "AUTO",      // ← Change to "AUTO"
  autoTriggerInterval: 5,   // ← Choose: 5, 10, 15, or 20 minutes
  // ... rest of config
};
```

3. Save the file

**Example Configurations:**
- Fast processing: `autoTriggerInterval: 5`
- Moderate processing: `autoTriggerInterval: 10`
- Batch processing: `autoTriggerInterval: 20`

#### OPTION B: MANUAL MODE (For On-Demand Approval)

Data routes immediately when confirmed:

1. Open `config.gs`
2. Edit:

```javascript
const WORKFLOW_CONFIG = {
  triggerMode: "MANUAL",    // ← Set to "MANUAL"
  autoTriggerInterval: 5,   // ← Not used in MANUAL mode (can be any value)
  // ... rest of config
};
```

3. Save the file

---

## STEP 6: SET UP TIME-BASED TRIGGERS

### Only required if using AUTO mode

1. In the Apps Script editor, go to **Triggers** (left sidebar, clock icon)
2. Click **"+ Create new trigger"**
3. Configure as follows:

```
Choose which function to run: runApprovalWorkflow
Which deployment should be used: Head
Select event source: Time-driven
Select type of time based trigger: Minutes timer
Select minute interval: Every 5 minutes
                        (or Every 10/15/20 minutes based on your config)
Failure notifications: Daily
```

4. Click **Save**

**Result:** Your workflow will automatically run every 5-20 minutes!

---

## STEP 7: TEST THE WORKFLOW

### Quick Test (2-3 minutes):

1. Go back to your Google Sheet
2. In **Department 1 Queue**:
   - Row 2, Column A: Type `TEST-001`
   - Row 2, Column B: Type `Test Value A`
   - Row 2, Column C: Type `Test Value B`
   - Row 2, Column D: Check the **Dept1_Confirmed** checkbox ✓

3. **AUTO Mode:** Wait for the next scheduled interval (5-20 min)
4. **MANUAL Mode:** Go to Apps Script → Run → `triggerManualWorkflow`

5. Check **Department 2 Queue** tab
   - **Expected:** The test record should appear in Department 2 Queue

### Verify Each Stage:

- **Department 1 Queue:** Check `Dept1_Confirmed` → Marked as processed (green)
- **Department 2 Queue:** Record appears (empty `Dept2_Confirmed`)
- **Department 3 Queue:** Record appears after confirming in Dept 2
- **Department 4 Archive:** Record appears after confirming in Dept 3 (final stage)

---

## STEP 8: GRANT DEPARTMENT ACCESS

### Share Sheet with Departments:

1. Go to your Google Sheet
2. Click **Share** (top right)
3. For each department, add their email:

```
Department 1: dept1@company.com     → Editor
Department 2: dept2@company.com     → Editor
Department 3: dept3@company.com     → Editor
Department 4: dept4@company.com     → Viewer (read-only, archive)
```

4. **Restrict Access:**
   - Click **Restrict** so only shared people can view
   - Disable comments (optional)

### Control Sheet Visibility:

Each department should only see their queue:

**Option 1: Manual (Simple)**
- Just inform each dept which tab to use
- They will only see data relevant to them

**Option 2: Automatic (Advanced)**
- Use Sheet protection + named ranges
- (See Advanced section in troubleshooting)

---

## ⚙️ ADVANCED CONFIGURATION

### Change Number of Departments:

To add **Department 5, 6, or 7**:

1. Create new sheets: `Department 5 Queue`, `Department 6 Queue`, etc.
2. Add appropriate column headers (follow the pattern from Step 3)
3. Edit `config.gs`:

```javascript
const WORKFLOW_CONFIG = {
  departments: [
    { id: 1, name: "Department 1 Queue", confirmColumn: "Dept1_Confirmed", ... },
    { id: 2, name: "Department 2 Queue", confirmColumn: "Dept2_Confirmed", ... },
    // ... add more departments here
    { id: 7, name: "Department 7 Archive", confirmColumn: "Final_Approved", ... }
  ],
  // ...
};
```

4. Save and re-run tests

### Change Admin Email (for notifications):

1. Edit `config.gs`
2. Find: `adminEmail: "admin@example.com"`
3. Replace with: `adminEmail: "your-email@company.com"`
4. Save

### Enable/Disable Notifications:

1. Edit `config.gs`
2. Find: `enableNotifications: true`
3. Change to: `enableNotifications: false` (to disable)

---

## 📊 MONITOR WORKFLOW

### View Workflow Statistics:

1. In Apps Script editor, click **Run**
2. Select `printWorkflowStats`
3. View results in **Execution log** (bottom of editor)

### Export Statistics to Sheet:

1. In Apps Script editor, click **Run**
2. Select `exportStatsToSheet`
3. A new **"Workflow Stats"** sheet will be created
4. View real-time completion percentages

---

## 🐛 TROUBLESHOOTING

### Problem: "Sheet not found" error

**Solution:**
- Check that all sheet names match exactly (case-sensitive)
- Ensure you created sheets in Step 2
- Run `validateConfig()` in Apps Script to verify

### Problem: Data not moving between departments

**Solution:**
- Verify the confirmation column was checked (TRUE value)
- Check that column names match exactly
- If in AUTO mode: Wait for the scheduled interval
- If in MANUAL mode: Run `triggerManualWorkflow()` manually
- Check Apps Script logs for errors (Ctrl+Enter)

### Problem: "Authorization required" message

**Solution:**
- Click "Review permissions" and authorize the script
- Check that you're using the same Google Account
- Click "Allow" when prompted

### Problem: Timestamps not showing

**Solution:**
- Make sure timestamp columns are formatted as Date/Time
- Select the column → Format → Number → Date time
- Run workflow again

### Problem: Duplicate records appearing

**Solution:**
- Check the "Processed" column (should be checked/TRUE)
- Run `resetProcessedFlags()` to clear all processed flags
- Re-test the workflow

### Problem: Need to reconfigure trigger interval

**Solution:**
1. Go to Apps Script → Triggers (left sidebar)
2. Delete the old trigger
3. Edit `config.gs` with new interval
4. Create a new trigger with the new interval

### Problem: Manual confirmations not triggering routes

**Make sure:**
- Trigger mode is set to `"MANUAL"` in config.gs
- The confirmation checkbox column name matches `Dept#_Confirmed` exactly
- You're using checkboxes (Format → Conditional formatting → Checkbox)
- Wait 1-2 seconds after confirming before checking next sheet

---

## 🎓 BEST PRACTICES

1. **Backup Your Sheet Regularly**
   - File → Version history → Save a copy

2. **Test with Sample Data First**
   - Create a test sheet before using real data
   - Verify the workflow works end-to-end

3. **Monitor the Logs**
   - Check Apps Script logs weekly for errors
   - Run `printWorkflowStats()` to see progress

4. **Document Your Process**
   - Add comments in Notes column explaining each approval
   - Keep an approval log for auditing

5. **Set Permissions Correctly**
   - Department 1-N: Editor access
   - Department (Final): Viewer-only access
   - Admin: Editor access

---

## 📞 QUICK REFERENCE

| Task | How To |
|------|--------|
| Start workflow (MANUAL) | Apps Script → Run `triggerManualWorkflow` |
| View statistics | Apps Script → Run `printWorkflowStats` |
| Export stats to sheet | Apps Script → Run `exportStatsToSheet` |
| Add test data | Apps Script → Run `testWorkflowWithSampleData` |
| Reset all processing | Apps Script → Run `resetProcessedFlags` |
| Change trigger mode | Edit `config.gs` → `triggerMode` |
| Change trigger interval | Edit `config.gs` → `autoTriggerInterval` |
| Validate setup | Apps Script → Run `validateConfig` |

---

## ✅ SETUP COMPLETE!

Once you've completed all steps:

1. Your workflow is live and running
2. Data will automatically (AUTO) or manually (MANUAL) route through departments
3. Each department confirms data before it moves forward
4. Final approved data sits in the Archive sheet

**Need help?** Check the Troubleshooting section or review the main README.md for architecture details.

---

**Last Updated:** 2026-09-11  
**Version:** 1.0.0
