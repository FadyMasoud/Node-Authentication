const express = require("express");
const { register, login, logout, profile } = require("../controllers/authController");


const { basicAuth } = require("../Auth/basicAuth");
const { jwtauth } = require("../Auth/jwtAuth");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

//Normal route profile without auth
// router.get("/profile",profile);


// 1 - using basic auth 
// router.get("/profile", basicAuth, profile);

// 3 - using jwt auth 
router.get("/profile", jwtauth, profile);


module.exports = router;