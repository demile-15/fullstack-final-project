import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const app = express();
const port = 8080;

app.use(express.json()); // take in express and use in json format
app.use(
    cors({
        origin: "http://localhost:3000",
    }) // specify we're using cors for frontend
);

// Get all tasks
app.get("/tasks", async(req, res) => {
    try {
        const collectionRef = collection(db, "Tasks");
        const collectionSnap = await getDocs(collectionRef);
        const tasks = [];
        collectionSnap.forEach((task) => {
            tasks.push({ id: task.id, ...task.data() });
        })
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: "Error fetching tasks"});
    }
});

// Add a new task
app.post("/tasks", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Task name is required" });
          }
          await addDoc(collection(db, "Tasks"), { name });
          res.status(201).json({ message: "Task added successfully" });
        } catch (error) {
          res.status(500).json({ error: "Error adding task" });
    }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    try {
      const taskId = req.params.id;
      await deleteDoc(doc(db, "Tasks", taskId));
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  });

// STARTS THE PROGRAM
app.listen(port, () => {
    console.log("Server running on port", port);
});