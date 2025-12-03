// Express is a web server application framework for Node.js that allows you to build web applications and APIs. 
 // It provides a set of tools for handling HTTP requests and responses, routing, middleware, and more.
 
 


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());


// Meaning "Cros Origin Resource Sharing" To allow cross-origin requests from different domains (that u want to allow make requests to your api)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//or allow all origins 
// app.use(cors());


// Routes
//require("./routes/authRoutes");
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
