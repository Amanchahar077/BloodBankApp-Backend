const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModal.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }
    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModal(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register Api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const existingUser = await userModal.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
