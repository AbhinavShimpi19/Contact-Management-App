const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// @desc    Register a User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashPassword);

  // Create user in the database
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  console.log(`User Created: ${user}`);

  if (user) {
    return res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc    Login the User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All feilds are mandotory!");
  }
  const user = await User.findOne({ email });

  //comapare password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesssToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accesssToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
});

// @desc    Current User info
// @route   GET /api/users/current
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
  return res.json({ message: "Current User information" });
});

module.exports = { registerUser, loginUser, currentUser };
