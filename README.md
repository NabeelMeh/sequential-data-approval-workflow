# Sequential Data Approval Workflow System

A lightweight, spreadsheet-based workflow automation system that routes data through 4 sequential approval stages using Google Sheets and Google Apps Script.

## 🎯 Overview

This system allows data to flow through multiple departments sequentially:
- **Department 1**: Views and confirms raw data
- **Department 2**: Reviews Department 1 approved data
- **Department 3**: Reviews Department 2 approved data
- **Department 4**: Receives fully approved data

Each department only sees data that has been explicitly confirmed by the previous department.

## 📊 Tech Stack

- **Google Sheets** - Data storage and UI
- **Google Apps Script** - Automation engine (free, no backend needed)
- **Zero dependencies** - Works entirely within Google Workspace

### Why Google Sheets + Apps Script?

✅ **Free** - No hosting or server costs  
✅ **Real-time collaboration** - Built-in sharing and permissions  
✅ **No coding infrastructure** - Deploy directly from Google Drive  
✅ **Instant updates** - Triggers and time-based automations  
✅ **Easy to audit** - Full revision history in Sheets  

## 🏗️ Sheet Structure

### 1. **Master Data Sheet** (Department 1 Input)
| ID | Data Field 1 | Data Field 2 | Status | Timestamp |
|----|--------------|--------------|--------|-----------|
| 001 | Value A | Value B | pending | 2026-09-11 |
| 002 | Value C | Value D | pending | 2026-09-11 |

**Status values**: `pending` → moves to Department 2 when confirmed

---

### 2. **Department 1 Queue**
| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept1_Timestamp | Notes |
|----|--------------|--------------|-----------------|-----------------|-------|
| 001 | Value A | Value B | ☑️ | 2026-09-11 10:30 | |

**Purpose**: Department 1 reviews and marks "Dept1_Confirmed" = TRUE

---

### 3. **Department 2 Queue**
| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept2_Confirmed | Dept2_Timestamp | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-------|
| 001 | Value A | Value B | ☑️ | ☑️ | 2026-09-11 11:00 | |

**Purpose**: Department 2 only sees Dept1_Confirmed data. Marks Dept2_Confirmed = TRUE

---

### 3. **Department 3 Queue**
| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept2_Confirmed | Dept3_Confirmed | Dept3_Timestamp | Notes |
|----|--------------|--------------|-----------------|-----------------|-----------------|-----------------|-------|
| 001 | Value A | Value B | ☑️ | ☑️ | ☑️ | 2026-09-11 11:30 | |

**Purpose**: Department 3 only sees Dept2_Confirmed data. Marks Dept3_Confirmed = TRUE

---

### 4. **Department 4 Archive (Final Approved)**
| ID | Data Field 1 | Data Field 2 | Dept1_Confirmed | Dept2_Confirmed | Dept3_Confirmed | Final_Approved | Final_Timestamp | Approval_Chain |
|----|--------------|--------------|-----------------|-----------------|-----------------|-----------------|-----------------|------------------|
| 001 | Value A | Value B | ☑️ | ☑️ | ☑️ | ☑️ | 2026-09-11 12:00 | Dept1→Dept2→Dept3→Dept4 |

**Purpose**: Read-only archive of fully approved data

---

## 🔄 Workflow Logic

```
Master Data (Raw)
        ↓
   [Dept 1 Reviews] 
   Marks: Dept1_Confirmed = TRUE
        ↓
   [Dept 2 Queue] 
   (Auto-populated with Dept1 approved data)
   Marks: Dept2_Confirmed = TRUE
        ↓
   [Dept 3 Queue] 
   (Auto-populated with Dept2 approved data)
   Marks: Dept3_Confirmed = TRUE
        ↓
   [Dept 4 Archive] 
   (Auto-archived - Read only, fully approved)
```

## ⚙️ Automation Rules

### Rule 1: Department 1 → Department 2
**Trigger**: When `Dept1_Confirmed = TRUE` in Department 1 Queue
**Action**: Copy row to Department 2 Queue with empty `Dept2_Confirmed` column

### Rule 2: Department 2 → Department 3
**Trigger**: When `Dept2_Confirmed = TRUE` in Department 2 Queue
**Action**: Copy row to Department 3 Queue with empty `Dept3_Confirmed` column

### Rule 3: Department 3 → Department 4
**Trigger**: When `Dept3_Confirmed = TRUE` in Department 3 Queue
**Action**: Copy row to Department 4 Archive with `Final_Approved = TRUE`

### Rule 4: Mark as Processed
**Trigger**: Row successfully moved to next stage
**Action**: Mark original row as "processed" to prevent duplicate routing

## 📋 Setup Instructions

1. **Create a Google Sheet** with the 5 sheets listed above
2. **Copy the Google Apps Script code** into Apps Script editor
3. **Set up triggers** for automation (time-based, 1-5 minutes intervals)
4. **Configure column headers** exactly as specified
5. **Grant department access** using Sheets sharing permissions
6. **Test the workflow** with sample data

## 🔐 Access Control

- **Department 1**: Full access to "Department 1 Queue"
- **Department 2**: Full access to "Department 2 Queue"
- **Department 3**: Full access to "Department 3 Queue"
- **Department 4**: View-only access to "Department 4 Archive"
- **Admin**: Full access to all sheets

## 📁 Project Files

- `apps-script/main.gs` - Core workflow automation engine
- `apps-script/config.gs` - Configuration and column mappings
- `apps-script/triggers.gs` - Trigger setup
- `SETUP_GUIDE.md` - Step-by-step setup instructions
- `TROUBLESHOOTING.md` - Common issues and solutions

## 🚀 Quick Start

See `SETUP_GUIDE.md` for detailed instructions on:
1. Creating your Google Sheet
2. Deploying the Apps Script
3. Testing the workflow
4. Monitoring approval progress

---

**Version**: 1.0.0  
**Last Updated**: 2026-09-11  
**License**: MIT
