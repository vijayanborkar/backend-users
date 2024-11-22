require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userModel = require("./models/user");
const sequelize = require("./lib/sequelize");

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced.");
  })
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

// Exercise 2: Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch all users." });
  }
});

//  Exercise 3: Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let user = await userModel.findByPk(userId);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
