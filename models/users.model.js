const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userId: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  middleName: String,
  email: String,
  phone: Number,
  state: String,
  country: String,
  city: String,
  pinCode: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = model("User", userSchema);
