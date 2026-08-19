const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Harini Portfolio Backend is running."
    });
});

app.post("/api/contact", (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    console.log("New contact message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        message: "Message received successfully."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
