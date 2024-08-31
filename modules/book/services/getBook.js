const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Book = mongoose.model("book");
const responseMessage = require("../../../label/response");

const ListBook = async (req, res) => {
  const { page, rowsPerPage } = req.query;
  const skip = (page - 1) * rowsPerPage;
  const books = await Book.find({ deletedAt: null, userId: req.user._id })
    .skip(skip)
    .limit(rowsPerPage)
    .exec();

  const totalDocuments = await Book.countDocuments({
    deletedAt: null,
    userId: req.user._id,
  });

  res.status(httpStatus.OK).send({
    books,
    totalPages: totalDocuments,
    message: responseMessage.ListBook,
  });
};

module.exports = ListBook;
