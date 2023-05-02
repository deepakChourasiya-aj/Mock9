const express = require("express")

const PostRouter = express.Router();

const jwt = require("jsonwebtoken")
const bcrypt = require("jsonwebtoken");
const { UserModel } = require("../models/usermodel");
const { PostModel } = require("../models/postMode");
const { authentication } = require("../middlewares/middlewares");

PostRouter.get("/posts",async(req,res)=>{
    let allPost = await PostModel.find({})
    if(allPost){
      res.status(200).send({msg:"all post are..",data:allPost});
    }else{
      res.status(500).send({msg:"server error"})
    }
  })
  
  PostRouter.post("/posts",authentication, async (req, res) => {
    try {
      let isUserPresent = await UserModel.findOne({_id:req.body.userID});
      if(isUserPresent){
        let createPost = new PostModel(req.body);
        await createPost.save();
        res.status(201).send({"msg":"new post has been created successfully",createPost});
      }else{
        res.status(500).send({"msg":"user not found"});
      }
    } catch (error) {
      console.log("error creating the post",error);
      res.status(500).send("server error");
    }
  });
  
  PostRouter.patch("/posts/:id",authentication,async(req,res)=>{
    let id = req.params.id;
    let post = await PostModel.findOne({_id:id});
    console.log(post)
    try {
      let payload = req.body;
      if(post){
        let updatePost = await PostModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({"msg":"post updated successfully",updatePost});
      }else{
        res.send("server error")
      }
    } catch (error) {
      res.send("error updating");
      console.log(err);
    }
  })
  // DELETE THE POST HERE ------------
  PostRouter.delete("/posts/:id",authentication,async(req,res)=>{
    let id = req.params.id;
    let post = await PostModel.findOne({_id:id});
    console.log(post)
    try {
      if(post){
        let deletePost = await PostModel.findByIdAndDelete({_id:id});
        res.status(202).send({"msg":"post deleted successfully",deletePost});
      }else{
        res.send("canNot found / server error")
      }
    } catch (error) {
      res.send("error in deleting");
      console.log(err);
    }
  })
  
  // GET POST BY POST ID -
  PostRouter.get("/posts/:id",async(req,res)=>{
    let id = req.params.id;
    let post = await PostModel.findOne({_id:id});
    if(post){
      res.status(200).send({"msg":"post available",post});
    }else{
      res.status(500).send("server error")
    }
  })
  
  // SEND THE FRIEND REQUEST TO THE ANOTEHR USER ;
  PostRouter.post("/users/:id/friends",authentication, async (req, res) => {
    try {
      let isUserPresent = await UserModel.findOne({_id:req.body.userID});
      if(isUserPresent){
        let createReq =  await PostModel.findByIdAndUpdate({_id:isUserPresent._id},payload);
  
        res.status(201).send({"msg":"new friend req send successfully ",createReq});
      }else{
        res.status(500).send({"msg":"user not found"});
      }
    } catch (error) {
      console.log("error creating the request",error);
      res.status(500).send("server error");
    }
  });
  PostRouter.get("/users/:id/friends",authentication, async (req, res) => {
    try {
      let isUserPresent = await UserModel.findOne({_id:req.body.userID});
      if(isUserPresent){
        let createReq =  await PostModel.find({_id:isUserPresent._id});
  
        res.status(201).send({"msg":"all friend reqs ",createReq});
      }else{
        res.status(500).send({"msg":"user not found"});
      }
    } catch (error) {
      console.log("error creating the request",error);
      res.status(500).send("server error");
    }
  });

  module.exports = {
    PostRouter
  }

