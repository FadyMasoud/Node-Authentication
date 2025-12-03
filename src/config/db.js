// const mongoose = require("mongoose");

// mongoose is a library that allows you to connect to a MongoDB database from your Node.js application.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("True:**MongoDB Connected Successfully**");
  } catch (error) {
    console.error("False:### DB Connection Failed ###", error);
    process.exit(1);
  }
};

module.exports = connectDB;


