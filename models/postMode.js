const mongoose = require("mongoose");
const express = require("express");

const postSchema = mongoose.Schema({
  userID:String,
  text: String,
  image: String,
  createdAt: {
    type: Date
  },
  likes: [{ type: String, ref: "User" }],
  comments: [
    {
      user: { type: String, ref: "User" },
      text: String,
      createdAt: Date
    },
  ],
});
const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel
};
