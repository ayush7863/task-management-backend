const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.get("/allUsers", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).send("Registration Successfully!");
  } catch (error) {
    res.status(400).send("Registration Failed!");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email, password });
    if (user.length > 0) {
      const token = jwt.sign({ userID: user[0]._id }, "sagar");
      res.status(200).send({ msg: "Login Successful", token: token });
    } else {
      res.status(400).send({ error: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  userRouter,
};
