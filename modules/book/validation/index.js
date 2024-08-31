const { body } = require("express-validator");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Book = mongoose.model("book");

const responseMessage = require("../../../label/response");

const validate = (method) => {
  switch (method) {
    case "add": {
      return [
        body("title").notEmpty().withMessage({
          message: responseMessage.BookTitle,
          errorCode: httpStatus.UNPROCESSABLE_ENTITY,
        }),
        body("author").notEmpty().withMessage({
          message: responseMessage.BookAuthor,
          errorCode: httpStatus.UNPROCESSABLE_ENTITY,
        }),
      ];
    }
  }
};

module.exports = {
  validate,
};
