const Book = require("../services");

const AddBook = (req, res, next) => {
  try {
    return Book.AddBook(req, res);
  } catch (error) {
    return next(error);
  }
};
const ListBook = (req, res, next) => {
  try {
    return Book.ListBook(req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  AddBook,
  ListBook,
};
