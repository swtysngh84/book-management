const express = require("express");
const { AddUser, LoginUser, LogoutUser } = require("../controller");
const { validate } = require("../validation");
const validationErrorResponse = require("../../../middleware/validation");
const authenticate = require("../../../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", validate("add"), validationErrorResponse, AddUser);
userRouter.post(
  "/login",
  validate("login"),
  validationErrorResponse,
  LoginUser
);
userRouter.get("/logout", authenticate, validationErrorResponse, LogoutUser);

module.exports = { userRouter };
