const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middle Ware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://myresume-367d0.web.app",
      "https://myresume-367d0.firebaseapp.com",
      "https://sazzadul-islam-resume.web.app",
      "https://sazzadul-islam-resume.firebaseapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myresume.socu9.mongodb.net/?retryWrites=true&w=majority&appName=MyResume`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //  connection
    const BannerCollection = client.db("MyResume").collection("Banner");
    const UserDataCollection = client.db("MyResume").collection("UserData");
    const MySelfCollection = client.db("MyResume").collection("MySelf");
    const MyProjectCollection = client.db("MyResume").collection("MyProject");
    const ContactInfoCollection = client
      .db("MyResume")
      .collection("ContactInfo");

    // API Connections
    // Banner API
    app.get("/Banner", async (req, res) => {
      const result = await BannerCollection.find().toArray();
      res.send(result);
    });

    // UserData API
    app.get("/UserData", async (req, res) => {
      const result = await UserDataCollection.find().toArray();
      res.send(result);
    });

    // MySelf API
    app.get("/MySelf", async (req, res) => {
      const result = await MySelfCollection.find().toArray();
      res.send(result);
    });

    // MyProject API
    app.get("/MyProject", async (req, res) => {
      const result = await MyProjectCollection.find().toArray();
      res.send(result);
    });

    // ContactInfo API
    app.get("/ContactInfo", async (req, res) => {
      const result = await ContactInfoCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My Resume is Running");
});
app.listen(port, () => {
  console.log(`My Resume Server is Running On Port ${port}`);
});
