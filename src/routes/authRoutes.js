const express = require("express");
const { register, login, logout, profile } = require("../controllers/authController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", profile);

module.exports = router;