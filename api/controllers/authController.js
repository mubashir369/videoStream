import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ status: "User has been created" });
  } catch (error) {
    const key = Object.keys(error.keyPattern)[0];
    console.log(key);
    if (key == "email") {
      res.status(400).json({ message: "This Email already taken" });
    } else if (key == "username") {
      res.status(400).json({ message: "This username already taken" });
    } else {
      res.status(400).send("something wrong");
    }
  }
};
export const userLogin = async (req, res) => {
  
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT,
        { expiresIn: 86400 }
      );
      const { password, ...otherDetails } = user._doc;
      res.status(200).json({ details: { ...otherDetails }, token: token });
    } else {
      res.status(401).json({ success: false, message: "Incorrect Password" });
    }
  } else {
    res.status(401).json({ success: false, message: "User not fond" });
  }
};
