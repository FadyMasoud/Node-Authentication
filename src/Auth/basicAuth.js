const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Basic authentication middleware


exports.basicAuth = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ msg: "Basic Authentication required" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    console.log("Base64 Credentials:", base64Credentials);

    const decoded = Buffer.from(base64Credentials, "base64").toString("ascii");
    console.log("Decoded Credentials:", decoded);

    const [email, password] = decoded.split(":");
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email });
    console.log("User Found:", user ? "Yes" : "No");

    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    req.user = user;
    next();

  } catch (error) {
    console.error("ERROR IN BASIC AUTH:", error);
    res.status(500).json({ msg: "Basic Auth Error" });
  }
};
