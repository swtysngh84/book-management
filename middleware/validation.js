const { validationResult } = require("express-validator");
const httpStatus = require("http-status");

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

const validationErrorResponse = (req, res, next) => {
  const errors = myValidationResult(req).array();

  if (errors.length) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: errors,
      responseMessage: errors[0],
    });
  }

  next();
};

module.exports = validationErrorResponse;
