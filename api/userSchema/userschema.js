const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Cpassword: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});
user.pre("save", async function(next)  {
  const salt =await bcrypt.genSalt(10);
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
    this.Cpassword = await bcrypt.hash(this.Cpassword, salt);
    next();
  }
});
const USER = mongoose.model("USER", user);
module.exports = USER;
