const httpStatus = require("http-status");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const responseMessage = require("../../../label/response");

const LogoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(httpStatus.OK).send({
    message: responseMessage.Logout,
  });
};

module.exports = LogoutUser;
