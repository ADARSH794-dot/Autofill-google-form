# Autofill Google Form 

A web application that automatically populates a **Student Registration Form** by fetching student details from a backend server using just the **USN (University Serial Number)**. Students only need to enter their USN — all other fields are filled in automatically.

---

##  Features

- **Auto-fetch student data** — Enter a USN and click "Fetch Details" to populate all fields instantly
- **Read-only autofilled fields** — Prevents accidental edits to fetched data
- **Resume upload** — Supports PDF, DOC, and DOCX file formats
- **Clear form** — Reset all fields with a single click
- **Clean UI** — Styled with a dedicated CSS file for a polished look

---

##  Project Structure

```
Autofill-google-form/
├── main.html           # Frontend — Student Registration Form UI
├── script_dynamic.js   # Client-side JS — fetches student data and handles form logic
├── server.js           # Node.js backend — serves student data by USN
├── styles.css          # Stylesheet for the form UI
├── uploads/            # Directory where uploaded resumes are stored
├── package.json        # Node.js project metadata and dependencies
└── package-lock.json   # Locked dependency versions
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ADARSH794-dot/Autofill-google-form.git
cd Autofill-google-form

# 2. Install dependencies
npm install

# 3. Start the backend server
node server.js
```

### Usage

1. Open your browser and navigate to `http://localhost:<port>` (check `server.js` for the port number).
2. Open `main.html` in your browser (or it may be served by the Node.js server).
3. Enter a valid **USN** in the input field.
4. Click **"Fetch Details"** — all student fields will be populated automatically.
5. Upload your **resume** (PDF/DOC/DOCX).
6. Click **Submit** to submit the form.

---

##  How It Works

```
User enters USN
      │
      ▼
script_dynamic.js calls backend API with USN
      │
      ▼
server.js looks up student record and returns JSON
      │
      ▼
Form fields are auto-populated (read-only)
      │
      ▼
User uploads resume and submits the form
      │
      ▼
server.js saves the resume to /uploads
```

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS,  JavaScript |
| Backend | Node.js (`server.js`) |
| File Handling | Multipart form upload → `/uploads` directory |

---
