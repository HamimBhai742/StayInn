const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://foodbukka.herokuapp.com/api/v1/restaurant",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bls3tyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // auth related api
    const database = client.db("stayInnDB");
    const roomsCollection = database.collection("rooms");
    const usersCollection = database.collection("users");
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //user data save in new database

    app.put("/user", async (req, res) => {
      const user = req.body;
      console.log(user);

      const filter = { email: user?.email }; // Filter to find the document
      const options = { upsert: true }; // Optional: create the document if it doesn't exist
      const isExist = await usersCollection.findOne(filter);
      console.log(isExist);
      if (isExist) {
        if (user?.status === "Requested") {
          console.log("first");
          const result = await usersCollection.updateOne(filter, {
            $set: { status: user?.status },
          });
          return res.send(result);
        } else {
          return res.send(isExist);
        }
      }
      const updateDocs = {
        $set: {
          name: user?.name,
          email: user?.email,
          role: user?.role,
          status: user?.status,
          timestamp: Date.now(),
        },
      };

      // Correct order: filter, update, options
      const result = await usersCollection.updateOne(
        filter,
        updateDocs,
        options
      );
      res.send(result);
    });

    //find all user data
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //find single user by email
    app.get("/role/:email", async (req, res) => {
      const email = req.params.email;
      const options = {};
      const query = { email: email };
      const result = await usersCollection.findOne(query, options);
      res.send(result);
    });

    //Update user role
    app.put("/role/:email", async (req, res) => {
      const user = req.body;
      const email = req.params.email;
      const updateDoc = {
        $set: {
          status: user?.status,
          role: user?.role,
        },
      };
      const filter = { email: email };
      const result = await usersCollection.updateOne(filter,updateDoc);
      res.send(result);
    });

    //add new room by host
    app.post("/add-room", async (req, res) => {
      const roomData = req.body;
      const result = await roomsCollection.insertOne(roomData);
      res.send(result);
    });

    // All Room Find
    app.get("/rooms", async (req, res) => {
      const fiQuery = req.query.category;
      console.log(fiQuery);
      let query = {};
      if (fiQuery && fiQuery !== "null") query = { category: fiQuery };
      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    // find room By Category
    app.get("/room/:id", async (req, res) => {
      const id = req.params.id;
      const query = new ObjectId(id);
      const result = await roomsCollection.findOne(query);
      res.send(result);
    });

    // find my listing by host email
    app.get("/my-listings/:email", async (req, res) => {
      const email = req.params.email;
      const options = {};
      const query = { "host.email": email };
      const result = await roomsCollection.find(query, options).toArray();
      res.send(result);
    });

    //delete room by hoast
    app.delete("/my-room/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      console.log(query, "query");
      const options = {};
      const result = await roomsCollection.deleteOne(query, options);
      res.send(result);
    });

    //update Room data by host

    app.patch("/my-room-update/:id", async (req, res) => {
      const roomData = req.body;
      const id = req.params.id;
      console.log(roomData);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          location: roomData?.location,
          description: roomData?.description,
          category: roomData?.category,
          bedrooms: roomData?.bedrooms,
          bathrooms: roomData?.bathrooms,
          guests: roomData?.guests,
          price: roomData?.price,
          title: roomData?.title,
          from: roomData?.from,
          to: roomData?.to,
          image: roomData?.image,
        },
      };
      const result = await roomsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from StayVista Server..");
});

app.listen(port, () => {
  console.log(`StayInn is running on port ${port}`);
});
