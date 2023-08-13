const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://mongodb/tasks", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to db!");
    })
    .catch(() => {
        console.log("Something went wrong!");
    });

const Task = mongoose.model("Task", {
    title: String,
    description: String,
});

// CRUD routes
app.post("/tasks", async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.json(newTask);
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, { title, description });
    res.json({ message: "Task updated successfully" });
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
