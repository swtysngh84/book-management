const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const responseMessage = require("../../../label/response");

const AddUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  await new User({
    name,
    email: email.toLowerCase(),
    password: hash,
  }).save();
  res.status(httpStatus.CREATED).send({
    user: {
      name,

      email,
    },
    message: responseMessage.AddUser,
  });
};

module.exports = AddUser;
