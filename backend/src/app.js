const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const categoryRoutes = require("./routes/category.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running Successfully"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;