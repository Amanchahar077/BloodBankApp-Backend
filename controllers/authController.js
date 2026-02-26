const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");

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

module.exports = { registerController };
