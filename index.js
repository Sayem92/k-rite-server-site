const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle ware--
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhckmem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const addTaskCollection = client
      .db("Task-Management")
      .collection("addTask");

    // add task data save---
    app.post("/addTask", async (req, res) => {
      const addTask = req.body;
      const result = await addTaskCollection.insertOne(addTask);
      res.send(result);
    });

    
  } catch (err) {
    console.log(err);
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Task Management server is running");
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
