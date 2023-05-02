const mongoose = require("mongoose");
const express = require("express");

// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String,
//     dob: Date,
//     bio: String,
//     posts: [{ type: ObjectId, ref: 'Post' }],
//     friends: [{ type: ObjectId, ref: 'User' }],
//     friendRequests: [{ type: ObjectId, ref: 'User' }]
//   }
const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        dob: Date,
        bio: String,
    posts: [{ type: String, ref: 'Post' }],
    friends: [{ type: String, ref: 'User' }],
    friendRequests: { type: String }
      
})
const UserModel = mongoose.model('User',userSchema);

module.exports = {
    UserModel
}