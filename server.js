const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

/* ==============================
   DATABASE CONNECTION (POOL)
============================== */

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "MYSQL8044",   // your password
    database: "college"
});

/* ==============================
   ENSURE UPLOADS FOLDER EXISTS
============================== */

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

/* ==============================
   MULTER SETUP
============================== */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

/* ==============================
   FETCH STUDENT BY USN
============================== */

app.get("/fetch-student", (req, res) => {

    const usn = req.query.usn;

    if (!usn) {
        return res.status(400).json({ error: "USN required" });
    }

    db.query(
        "SELECT * FROM stu1 WHERE usn = ?",
        [usn],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "Student not found" });
            }

            return res.json(result[0]);
        }
    );
});

/* ==============================
   SUBMIT FORM + SAVE RESUME
============================== */

app.post("/add-student", upload.single("resume"), (req, res) => {

    const {
        usn, name, gender, branch,
        tenth, twelfth, cgpa,
        email, mobile, backlog
    } = req.body;

    const resumeFile = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO stu1
        (usn, name, gender, branch, tenth, twelfth, cgpa, email, mobile, backlog, resume)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [usn, name, gender, branch, tenth, twelfth, cgpa, email, mobile, backlog, resumeFile],
        (err) => {

            if (err) {
                console.log("Insert Error:", err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Student submitted successfully",
                resume: resumeFile
            });
        }
    );
});

/* ==============================
   START SERVER
============================== */

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 🚀");
});
