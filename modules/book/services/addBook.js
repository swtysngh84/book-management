const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Book = mongoose.model("book");
const responseMessage = require("../../../label/response");

const AddBook = async (req, res) => {
  const { title, author } = req.body;
  const book = await new Book({
    title,
    author,
    userId: req.user._id,
  }).save();
  res.status(httpStatus.CREATED).send({
    book,
    message: responseMessage.AddBook,
  });
};

module.exports = AddBook;
