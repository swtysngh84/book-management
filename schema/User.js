const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const User = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);
async function generateAuthToken() {
  if (!process.env.USER_SECRET_KEY?.length) {
    throw new Error("USER_SECRET_KEY env var is not defined.");
  }
  const { _id, email, password } = this;
  return jwt.sign(
    {
      _id: _id.toString(),
      email,
      password,
    },
    process.env.USER_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
}
User.methods.generateAuthToken = generateAuthToken;
module.exports = model("user", User, "user");
