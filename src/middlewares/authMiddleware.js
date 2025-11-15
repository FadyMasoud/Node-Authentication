const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ msg: "Not authenticated" });



    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    console.log(token);
    console.log(decoded);

    // res.status(200).json({ msg: decoded });


    

    req.user = await User.findById(decoded.id).select("-password");
    // req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};