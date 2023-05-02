const express = require("express")
require("dotenv").config();
const jwt =require("jsonwebtoken");

const authentication = (req,res,next)=>{
    let token = req.headers.authorization;
  try {
    if(token){
        let decoded = jwt.verify(token,process.env.token)
        req.body.userID = decoded.userID
        console.log(decoded.userID);
        next();
    }else{
        res.send({msg:"error while authenticating"});
    }
  } catch (error) {
    res.send({msg:"error while authenticating"})
    console.log('error while authenticating')
  }
}
module.exports = {
    authentication
}