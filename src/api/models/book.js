const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
  title: {type: String, 
          required: true},
  author: {type: mongoose.Schema.Types.ObjectId,
           ref: "authors", 
           required: true},
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
  genre: [{
          type: String, 
          required: true, 
          enum: ["Fantasy", "Science Fiction", "Horror", "Adventure", "Historical", "Romance", "Thriller"]
        }],
  image: {type: String},
  isSeedData: { type: Boolean, default: false }
  },
  {
  timestamps: true,
  collection: "books"
  }
);

const Book = mongoose.model("books", bookSchema, "books");

module.exports = Book;