const mongooes = require("mongoose");

const userSchema = mongooes.Schema({
  username: {
    type: String,
    required: [true, "Please add the user name"],
  },
  email: {
    type: String,
    required: [true, "Please add the email adderess"],
    unique: [true, "Email adderess is already taken"],
  },
  password: {
    type: String,
    required: [true, "Please add the Password!!!"],
  }
}, {
  timestamps: true,
});

module.exports = mongooes.model("User", userSchema);