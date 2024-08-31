const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

module.exports = model("book", Book, "book");
