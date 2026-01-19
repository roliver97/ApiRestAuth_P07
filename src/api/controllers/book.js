const Author = require("../models/author");
const Book = require("../models/book");

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("postedBy", "userName").populate("author"); 
    return res.status(200).json(books);
  } catch (error) {
      console.error("Error al obtener los libros:", error); // Sintaxis para Backend (permite Stack Trace)
      return res.status(400).json( { message: `Error al obtener los libros: ${error.message}`}); // Sintaxis para Frontend (es texto plano y más legible)
  }
};

const postBook = async (req, res, next) => {
  try {
    const authorExists = await Author.findById(req.body.author);
    if (!authorExists) {
      return res.status(404).json("El ID de autor proporcionado no existe en la base de datos");
    }

    const bookDuplicated = await Book.findOne({ title: req.body.title });
    if(bookDuplicated){
      return res.status(400).json("Ese libro ya existe en la base de datos")
    }

    const newBook = new Book ({
      title: req.body.title,
      author: req.body.author,
      postedBy: req.user._id,
      genre: req.body.genre
    })

    const bookSaved = await newBook.save();
    return res.status(201).json(bookSaved)

  } catch (error) {
      console.error("Error al crear el libro:", error);
      return res.status(400).json( { message: `Error al crear el libro: ${error.message}`}); 
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookDeleted = await Book.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este libro ha sido eliminado", 
      bookDeleted
    });
  } catch (error) {
      console.error("Error al eliminar el libro:", error);
      return res.status(400).json( { message: `Error al eliminar el libro: ${error.message}`}); 
  }
}

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookUpdated = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!bookUpdated) {
        return res.status(404).json("Libro no encontrado");
    }

    return res.status(200).json({
      mensaje: "Los datos de este libro han sido actualizados", 
      bookUpdated
    });
  } catch (error) {
      console.error("Error al actualizar los datos del libro:", error);
      return res.status(400).json( { message: `Error al actualizar los datos del libro: ${error.message}`}); 
  }
}

module.exports = { getBooks, postBook, deleteBook, updateBook }