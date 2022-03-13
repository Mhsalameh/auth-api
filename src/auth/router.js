"use strict";
const express = require("express");
const router = express.Router();
const { Users } = require("../models/index.js");
const bcrypt = require("bcrypt");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer-auth.js");
const acl = require("./middleware/acl-middleware")

router.post("/signup", signUpHandler);
router.post("/signin", basicAuth, signInHandler);
router.get("/user", bearerAuth, acl('read'), (req,res)=>{
  res.status(200).json('secret read');
});
router.post("/user", bearerAuth, acl('create'), (req,res)=>{
  res.status(201).json('secret created');
});
router.put("/user", bearerAuth, acl('update'), (req,res)=>{
  res.status(201).json('secret created');
});
router.delete("/user", bearerAuth, acl('delete'), (req,res)=>{
  res.status(201).json('secret created');
});


async function signUpHandler(req, res) {
  // console.log(Users);
  const reqBody = req.body;
  const userName = reqBody.username;
  const password = reqBody.password;
  const role = reqBody.role;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await Users.create({
      username: userName,
      password: hashedPassword,
      role:role
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(`input cannot be null ${error}`);
  }
}

async function signInHandler(req, res) {
  res.status(200).json(req.user);
}



module.exports = router;
