const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Models
const Author = require("../api/models/author");
const Book = require("../api/models/book");
const User = require("../api/models/user");

// Data
const authorsData = require("../data/authors");
const booksData = require("../data/books");

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado a la BBDD para la Seed 🌱");

    try {
      await Author.collection.drop();
      await Book.collection.drop();
      console.log("Colecciones borradas 🧹");
    } catch (error) {
      console.log("No se han borrado colecciones (probablemente no existían).Seguimos... 🚀")
    }


    const adminUser = await User.findOne({ rol: "admin" });
    if (!adminUser) {
        console.error("⚠️ Error: No hay ningún usuario con rol 'admin' en la base de datos.");
        console.error("Crea un usuario y cambia su rol a 'admin' en la BBDD antes de lanzar la seed.");
        await mongoose.disconnect();
        return; 
    } else {
      console.log(`👤 Usuario ADMIN elegido para firmar el contenido: ${adminUser.userName}`);
    }

    const authorsCreated = await Author.insertMany(authorsData);

    const booksWithIds = booksData.map((book) => {
        const relatedAuthor = authorsCreated.find((author) => author.name === book._authorName);

        if (!relatedAuthor) {
            console.error(`Error: No he encontrado al autor ${book._authorName} para el libro ${book.title}`);
            return null;
        }

        return {
            title: book.title,
            genre: book.genre,
            author: relatedAuthor._id, 
            postedBy: adminUser._id,
            isSeedData: true
        };
    }).filter(book => book !== null);

    await Book.insertMany(booksWithIds);

    await mongoose.disconnect();
    console.log("Desconectado de la BBDD 👋");

  } catch (error) {
    console.error("Error en la seed:", error);
  }
};

seed();