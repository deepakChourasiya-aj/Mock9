const expres = require("express")

const UserRouter = expres.Router();

const jwt = require("jsonwebtoken")
const bcrypt = require("jsonwebtoken");
const { UserModel } = require("../models/usermodel");

UserRouter.post("/register", async (req, res) => {
    let { name, email, password, dob, bio, postsID, friends, friendRequests } =
      req.body;
    console.log(req.body);
    try {
      let check = await UserModel.findOne({ email: req.body.email });
      if (check) {
        let userID = check._id;
        let token = jwt.sign({ userID: userID }, process.env.token);
        return res.send({ msg: "user already exists;" ,token});
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
  UserRouter.get("/users", async (req, res) => {
    try {
      let users = await UserModel.find({});
      res.status(200).send({ msg: "all users", users });
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = {
    UserRouter
  }