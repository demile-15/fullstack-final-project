import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// IMPORT OUR DB!
import { db } from "./util/FirebaseInit.js";
// IMPORT FIREBASE FUNCTIONS!
import { collection, getDocs } from "firebase/firestore";

const app = express();
const port = 8080;

app.use(express.json()); // take in express and use in json format
app.use(
    cors({
        origin: "http://localhost:3000",
    }) // specify we're using cors for frontend
);


app.get("/", async(req, res) => {
    res.send("Hello world!")
});

app.get("/students", async(req, res) => {
    // Get a reference to the collection "Students"
    const collectionRef = collection(db, "Students");
    // Get all documents from the collection
    const collectionSnap = await getDocs(collectionRef);
    // Make a list of those documents
    const docs = []
    collectionSnap.forEach((doc) => {
        docs.push(doc.data());
    });
    // Return them
    res.send(docs);
});

// STARTS THE PROGRAM
app.listen(port, () => {
    console.log("Listening on port", port);
}); // listen for incoming traffic