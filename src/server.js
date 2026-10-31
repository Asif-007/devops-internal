const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Asif",
        rollNo: "23071A05A2"
    },
    {
        id: 2,
        name: "Akmal",
        rollNo: "23071A05A5"
    }
];


app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});



app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});


app.get("/api/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});


app.post("/api/students", (req, res) => {
    const { name, rollNo } = req.body;

    if (!name || !rollNo) {
        return res.status(400).json({
            message: "Name and rollNo are required"
        });
    }

    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        rollNo
    };

    students.push(student);

    res.status(201).json(student);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Student API running on port ${PORT}`);
    });
}

module.exports = app;