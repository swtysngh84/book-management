const { body } = require("express-validator");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const responseMessage = require("../../../label/response");
const { passwordRegex } = require("../../../helper");

const validate = (method) => {
  switch (method) {
    case "add": {
      return [
        body("name").notEmpty().withMessage({
          message: responseMessage.FirstNameRequired,
          errorCode: httpStatus.UNPROCESSABLE_ENTITY,
        }),
        // body("lastName").notEmpty().withMessage({
        //   message: responseMessage.LastNameRequired,
        //   errorCode: httpStatus.UNPROCESSABLE_ENTITY,
        // }),

        body("email")
          .notEmpty()
          .withMessage({
            message: responseMessage.EmailIsRequired,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .isEmail()
          .withMessage({
            message: responseMessage.EmailInValid,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .custom(async (value) => {
            const user = await User.findOne({ email: value, deletedAt: null });
            if (user) {
              return Promise.reject({
                message: responseMessage.ExistingUser,
                errorCode: httpStatus.UNPROCESSABLE_ENTITY,
              });
            }
            return true;
          }),
        body("password")
          .notEmpty()
          .withMessage({
            message: responseMessage.PasswordIsRequired,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .custom((value) => {
            if (!passwordRegex.test(value)) {
              return Promise.reject({
                message: responseMessage.PasswordInValid,
                errorCode: httpStatus.UNPROCESSABLE_ENTITY,
              });
            }
            return true;
          }),
      ];
    }
    case "login": {
      return [
        body("email")
          .notEmpty()
          .withMessage({
            message: responseMessage.EmailIsRequired,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .isEmail()
          .withMessage({
            message: responseMessage.EmailInValid,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .custom(async (value) => {
            console.log(value.toLowerCase());
            const user = await User.findOne({
              email: value.toLowerCase(),
              deletedAt: null,
            });
            if (!user) {
              return Promise.reject({
                message: responseMessage.UserDoesnotExist,
                errorCode: httpStatus.UNPROCESSABLE_ENTITY,
              });
            }
            return true;
          }),
        body("password")
          .notEmpty()
          .withMessage({
            message: responseMessage.PasswordIsRequired,
            errorCode: httpStatus.UNPROCESSABLE_ENTITY,
          })
          .custom((value) => {
            if (!passwordRegex.test(value)) {
              return Promise.reject({
                message: responseMessage.PasswordPattern,
                errorCode: httpStatus.UNPROCESSABLE_ENTITY,
              });
            }
            return true;
          }),
      ];
    }
  }
};

module.exports = {
  validate,
};
