const express = require("express");
const { AddBook, ListBook } = require("../controller");
const { validate } = require("../validation");
const validationErrorResponse = require("../../../middleware/validation");
const authenticate = require("../../../middleware/auth");

const bookRouter = express.Router();

bookRouter.post(
  "/add",
  authenticate,
  validate("add"),
  validationErrorResponse,

  AddBook
);
bookRouter.get("/list", authenticate, ListBook);

module.exports = { bookRouter };
