# 📋 SAMPLE DATA TEMPLATE
## Sequential Data Approval Workflow System

This file contains sample templates for setting up your workflow sheets.
**Copy these templates into your Google Sheet to get started quickly.**

---

## 📌 HOW TO USE THIS TEMPLATE

1. **Create your Google Sheet** (if not already done)
2. **Copy the data below** for each department
3. **Paste into the corresponding sheet tabs**
4. **Customize with your actual data**
5. **Deploy the Apps Script** (see SETUP_GUIDE.md)
6. **Test the workflow**

---

## 🔹 DEPARTMENT 1 QUEUE

**Sheet Name:** `Department 1 Queue`

**Headers (Row 1):**
```
A: ID
B: Data Field 1
C: Data Field 2
D: Dept1_Confirmed
E: Dept1_Timestamp
F: Dept1_Processed
G: Notes
```

**Sample Data:**

| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept1_Timestamp | Dept1_Processed | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-------|
| INV-001 | $1,500 | APPROVED | | | | Initial data entry |
| INV-002 | $2,300 | PENDING | | | | Waiting for review |
| INV-003 | $750 | APPROVED | | | | Rush order |
| INV-004 | $5,200 | PENDING | | | | Large amount |
| INV-005 | $890 | APPROVED | | | | Standard order |

**Customization Tips:**
- Replace "Data Field 1" and "Data Field 2" with your actual column names
- Change ID format to match your system (INV-*, ORD-*, PO-*, etc.)
- Add/remove sample rows as needed
- Keep Row 1 headers exactly as shown

---

## 🔹 DEPARTMENT 2 QUEUE

**Sheet Name:** `Department 2 Queue`

**Headers (Row 1):**
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

**Sample Data:**

| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept2_Processed | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| (Empty initially) | | | | | | | | |
| (Filled by automation) | | | | | | | | |

**Why empty?**
- This sheet is populated automatically by Department 1's confirmations
- It will fill when data is routed from Department 1
- Start with just headers, no sample data

---

## 🔹 DEPARTMENT 3 QUEUE

**Sheet Name:** `Department 3 Queue`

**Headers (Row 1):**
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

**Sample Data:**

| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept3_Confirmed | Dept3_Timestamp | Dept3_Processed | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| (Empty initially) | | | | | | | | | | |
| (Filled by automation) | | | | | | | | | | |

**Why empty?**
- This sheet is populated automatically by Department 2's confirmations
- It will fill when data is routed from Department 2
- Start with just headers, no sample data

---

## 🔹 DEPARTMENT 4 ARCHIVE

**Sheet Name:** `Department 4 Archive`

**Headers (Row 1):**
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

**Sample Data:**

| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept3_Confirmed | Dept3_Timestamp | Final_Approved | Final_Timestamp | Final_Processed | Approval_Chain | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| (Empty initially) | | | | | | | | | | | | | |
| (Filled by automation) | | | | | | | | | | | | | |

**Why empty?**
- This sheet is the final archive
- Populated only when records complete all approvals
- Start with just headers, no sample data
- This becomes read-only for most users

---

## 📊 COLUMN FORMATTING GUIDE

### For All Sheets:

**ID Column (Column A)**
- Format: Plain text
- Pattern: INV-001, ORD-001, PO-001, etc.
- Must be unique per sheet

**Data Columns (Columns B, C, etc.)**
- Format: Based on your data (Text, Number, Currency, etc.)
- Example: Use currency format for amounts ($1,500)

**Confirmation Columns (Dept#_Confirmed)**
- Format: **Checkbox**
  1. Select column
  2. Format → Conditional formatting → Checkbox
  3. Checked = TRUE, Unchecked = FALSE

**Timestamp Columns (Dept#_Timestamp)**
- Format: **Date/Time**
  1. Select column
  2. Format → Number → Date time
  3. Choose format: `9/11/2026 10:30:00 AM`

**Processed Columns (Dept#_Processed)**
- Format: **Checkbox**
  1. Same as Confirmation columns
  2. System-managed (auto-checked after routing)

**Notes Column (Column G, I, K, N)**
- Format: Plain text
- Optional comments/explanation

---

## 🎯 REAL-WORLD EXAMPLE

### Invoice Approval Workflow

**Department 1 Queue - Finance Entry**
| ID | Amount | Vendor | Dept1_Confirmed | Dept1_Timestamp | Dept1_Processed | Notes |
|----|--------|--------|-----------------|-----------------|-----------------|-------|
| INV-2024-001 | $1,500 | Acme Corp | | | | Data entry complete |
| INV-2024-002 | $2,300 | Tech Solutions | | | | Review in progress |

**Department 2 Queue - Budget Manager**
| ID | Amount | Vendor | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept2_Processed | Notes |
|----|--------|--------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| INV-2024-001 | $1,500 | Acme Corp | TRUE | 9/11/2026 10:00 | | | | Within budget |

**Department 3 Queue - Director Approval**
| ID | Amount | Vendor | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept3_Confirmed | Dept3_Timestamp | Dept3_Processed | Notes |
|----|--------|--------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| INV-2024-001 | $1,500 | Acme Corp | TRUE | 9/11/2026 10:00 | TRUE | 9/11/2026 10:30 | | | | Approved for payment |

**Department 4 Archive - Final Records**
| ID | Amount | Vendor | Dept1_Confirmed | Dept1_Timestamp | Dept2_Confirmed | Dept2_Timestamp | Dept3_Confirmed | Dept3_Timestamp | Final_Approved | Final_Timestamp | Final_Processed | Approval_Chain | Notes |
|----|--------|--------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-------|
| INV-2024-001 | $1,500 | Acme Corp | TRUE | 9/11/2026 10:00 | TRUE | 9/11/2026 10:30 | TRUE | 9/11/2026 11:00 | TRUE | 9/11/2026 11:00 | TRUE | Dept1→Dept2→Dept3→Dept4 | Ready for payment |

---

## ✅ PRE-WORKFLOW CHECKLIST

Before starting your workflow:

- [ ] All sheet names match exactly (Department 1 Queue, etc.)
- [ ] Row 1 contains all column headers
- [ ] Confirmation columns formatted as Checkboxes
- [ ] Timestamp columns formatted as Date/Time
- [ ] Processed columns formatted as Checkboxes
- [ ] Column names are exact (case-sensitive)
- [ ] Department 1 has sample data in rows 2+
- [ ] Departments 2-4 start with headers only
- [ ] Apps Script files deployed (config.gs, main.gs, triggers.gs)
- [ ] Trigger mode configured (AUTO or MANUAL)
- [ ] Trigger created (if using AUTO mode)

---

## 🚀 GETTING STARTED

1. **Create Google Sheet**
   - Name: "Sequential Data Approval Workflow"

2. **Create Sheet Tabs**
   - Right-click → Insert sheets for each department

3. **Add Headers**
   - Copy headers from this template to Row 1 of each sheet

4. **Format Columns**
   - Checkboxes for confirmation/processed columns
   - Date/Time for timestamp columns

5. **Add Sample Data** (Department 1 only)
   - Copy sample data to Department 1 Queue
   - Leave Departments 2-4 empty (headers only)

6. **Deploy Script**
   - Tools → Script Editor
   - Add the 3 script files

7. **Configure & Test**
   - Set trigger mode
   - Run sample workflow
   - Verify data moves through all stages

8. **Go Live**
   - Delete sample data
   - Add real data
   - Share with departments
   - Monitor workflow

---

## 📞 NEED HELP?

- **Setup issues?** → See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Troubleshooting?** → See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Quick lookup?** → See [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Architecture?** → See [README.md](README.md)

---

**Last Updated:** 2026-09-11  
**Version:** 1.0.0
