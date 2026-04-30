const API_BASE_URL = "http://localhost:3000";

/* ==============================
   FETCH STUDENT DATA
============================== */
async function fetchStudentData() {
    const usn = document.getElementById("usn").value.trim();

    if (!usn) {
        alert("Please enter USN");
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/fetch-student?usn=${encodeURIComponent(usn)}`
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Student not found");
            return;
        }

        // Fill all fields
        document.getElementById("name").value = data.name || "";
        document.getElementById("branch").value = data.branch || "";
        document.getElementById("tenth").value = data.tenth || "";
        document.getElementById("twelfth").value = data.twelfth || "";
        document.getElementById("cgpa").value = data.cgpa || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("mobile").value = data.mobile || "";
        document.getElementById("backlog").value = data.backlog || "";

        // Set gender
        if (data.gender === "Male") {
            document.getElementById("genderMale").checked = true;
        } else if (data.gender === "Female") {
            document.getElementById("genderFemale").checked = true;
        }

    } catch (error) {
        console.error(error);
        alert("Server error. Make sure backend is running.");
    }
}

/* ==============================
   SUBMIT FORM (WITH RESUME)
============================== */
async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("usn", document.getElementById("usn").value);
    formData.append("name", document.getElementById("name").value);
    formData.append("gender",
        document.querySelector('input[name="gender"]:checked')?.value || "");
    formData.append("branch", document.getElementById("branch").value);
    formData.append("tenth", document.getElementById("tenth").value);
    formData.append("twelfth", document.getElementById("twelfth").value);
    formData.append("cgpa", document.getElementById("cgpa").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("mobile", document.getElementById("mobile").value);
    formData.append("backlog", document.getElementById("backlog").value);

    const resumeFile = document.getElementById("resume").files[0];
    if (!resumeFile) {
        alert("Please upload resume");
        return;
    }

    formData.append("resume", resumeFile);

    try {
        const response = await fetch(`${API_BASE_URL}/add-student`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || "Submission failed");
            return;
        }

        alert(result.message || "Submitted successfully");

    } catch (error) {
        console.error(error);
        alert("Server error while submitting");
    }
}

/* ==============================
   CLEAR FORM
============================== */
function clearForm() {
    document.getElementById("studentForm").reset();
}
