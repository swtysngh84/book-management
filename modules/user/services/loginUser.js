const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const responseMessage = require("../../../label/response");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email.toLowerCase(),
    deleteOne: null,
  });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = await user.generateAuthToken();
    res.status(httpStatus.OK).send({
      user: { name: user.name, email: user.email },
      token,
      message: responseMessage.Login,
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED).send({
      message: responseMessage.DetailsNotMatch,
    });
  }
};

module.exports = LoginUser;
