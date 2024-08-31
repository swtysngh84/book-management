const User = require("../services");

const AddUser = (req, res, next) => {
  try {
    return User.AddUser(req, res);
  } catch (error) {
    return next(error);
  }
};
const LoginUser = (req, res, next) => {
  try {
    return User.LoginUser(req, res);
  } catch (error) {
    return next(error);
  }
};

const LogoutUser = (req, res, next) => {
  try {
    return User.LogoutUser(req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  AddUser,
  LoginUser,
  LogoutUser,
};
