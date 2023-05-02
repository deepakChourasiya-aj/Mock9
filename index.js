const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./models/usermodel");
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentication } = require("./middlewares/middlewares");
const { PostModel } = require("./models/postMode");
const { UserRouter } = require("./routes/usersroute");
const { PostRouter } = require("./routes/postsRoute");
app.get("/", (req, res) => {
  res.send("hii");
});

// app.use("/api/",UserRouter);
// REGISTER NEW USERS;
app.post("/api/register", async (req, res) => {
  let { name, email, password, dob, bio, postsID, friends, friendRequests } =
    req.body;
  console.log(req.body);
  try {
    let check = await UserModel.findOne({ email: req.body.email });
    if (check) {
      let userID = check._id;
      let token = jwt.sign({ userID: userID }, process.env.token);
      return res.send({ msg: "user already exists;", token });
    }

    bcrypt.hash(password, 5, async function (err, hash_pass) {
      if (err) {
        res.send({ msg: "error in encrypting " });
      } else {
        let user = new UserModel({
          name,
          email,
          password: hash_pass,
          dob,
          bio,
          postsID,
          friends,
          friendRequests,
        });
        await user.save();
        console.log(user._id);
        let token = jwt.sign({ userID: user._id }, process.env.token);
        res.send({ mst: "user has been created successfully", user, token });
      }
    });
  } catch (error) {
    res.send({ msg: "error " });
    console.log("error", error);
  }
});

// GET ALL USERS
app.get("/api/users", async (req, res) => {
  try {
    let users = await UserModel.find({});
    res.status(200).send({ msg: "all users", users });
  } catch (err) {
    console.log(err);
  }
});

// post routes here----------
app.use("/api/", PostRouter);

app.listen(process.env.port || 8000, async () => {
  try {
    await connection;
    console.log("connected to db at 8000");
  } catch (error) {
    console.log("connection error");
    console.log(error);
  }
});

// {
//  "name":"deepak",
//  "email":"deepak@gmail.com",
//  "password":"1234",
//  "dob":"2002-01-18",
//  "bio":"hi iam deepak sde2"
// }
