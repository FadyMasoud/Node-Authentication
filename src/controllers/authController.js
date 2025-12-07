const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already registered" });

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });


    // const isMatchwithoutbcrypt = await user.password === password;
    // if (!isMatchwithoutbcrypt)
    //   return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .status(200).json({
        msg: "Logged in successfully",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};




exports.profile = async (req, res) => {


  // return res.status(200).json({ msg: "WELCOME IN PROFILE" });


    if (!req.user)
    return res.status(401).json({ msg: "No authenticated user" });

  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    },
  });
};









exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
};


