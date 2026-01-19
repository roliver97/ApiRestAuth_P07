const Author = require("../models/author");
const Book = require("../models/book");

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find(); 
    return res.status(200).json(authors);
  } catch (error) {
      console.error("Error al obtener los autores:", error); // Sintaxis para Backend (permite Stack Trace)
      return res.status(400).json( { message: `Error al obtener los autores: ${error.message}`}); // Sintaxis para Frontend (es texto plano y más legible)
  }
};

const postAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author ({
      name: req.body.name,
      country: req.body.country,
      image: req.body.image,
    })

    const authorDuplicated = await Author.findOne({ name: req.body.name });
    
    if(authorDuplicated){
      return res.status(400).json("Este autor ya existe en la base de datos")
    }

    const authorSaved = await newAuthor.save();
    return res.status(201).json(authorSaved)

  } catch (error) {
      console.error("Error al crear el autor:", error);
      return res.status(400).json( { message: `Error al crear el autor: ${error.message}`}); 
  }
}

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorDeleted = await Author.findByIdAndDelete(id);
    
    if (!authorDeleted) {
        return res.status(404).json("Autor no encontrado");
    }

    await Book.deleteMany({ author: id }); // Si eliminamos un autor tambien eliminamos todos sus libros de la BBDD para evitar referencias a autores fantasma (null)

    return res.status(200).json({
      mensaje: "Este autor ha sido eliminado", 
      authorDeleted
    });
  } catch (error) {
      console.error("Error al eliminar el autor:", error);
      return res.status(400).json( { message: `Error al eliminar el autor: ${error.message}`}); 
  }
}

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorUpdated = await Author.findByIdAndUpdate(id, req.body, { new: true });

    if (!authorUpdated) {
        return res.status(404).json("Autor no encontrado");
    }

    return res.status(200).json({
      mensaje: "Los datos de este autor han sido actualizados", 
      authorUpdated
    });
  }  catch (error) {
      console.error("Error al actualizar los datos del autor:", error);
      return res.status(400).json( { message: `Error al actualizar los datos del autor: ${error.message}`}); 
  }
}

module.exports = { getAuthors, postAuthor, deleteAuthor, updateAuthor }