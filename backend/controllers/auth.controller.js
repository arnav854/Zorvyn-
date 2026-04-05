import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwtToken.js";

export const handleSignup = async (req, res) => {
  try {
    const { email, password, firstName, lastName} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", flag: false });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully"});
  } catch (error) {
    console.log(" error in handleSingupEmail  ", error);
    return res.status(500).json({
      message: "Internal server error  Account Not Created !",
      flag: false,
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password +role");

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "No such account exist "});
    }
    if (!comparePassword(password, existingUser.password)) {
      return res
        .status(401)
        .json({ message: " Please enter valid password "});
    }

    const token = generateToken(existingUser.id);
    res.cookie("token", token, {
      httpOnly: true,       
      secure: true,         
      sameSite: "strict",   
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(" error in handleLogin ", error);
    return res
      .status(500)
      .json({ message: "Internal server error" });
  }
};