const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    country: { 
      type: String 
    },
    image: { 
      type: String, 
      default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" 
    }
  },
  {
    timestamps: true,
    collection: "authors"
  }
);

const Author = mongoose.model("authors", authorSchema, "authors");

module.exports = Author;