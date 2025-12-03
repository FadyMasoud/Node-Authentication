const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    }
  },
  { timestamps: true }
);


// Encrypt password before saving in Database 

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;


// pre save hook is a function that runs before a data is saved to the database be a crypted password 
// is Modified is a function that checks if the password is encrypted before or not 

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
//   next();
// });

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);