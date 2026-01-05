const books_data = [
  {
    title: "Harry Potter y la piedra filosofal",
    genre: ["Fantasy", "Adventure"],
    // Este campo no existe en el modelo. Lo usamos para que la seed pueda encontrar el ID del autor.
    _authorName: "J.K. Rowling" 
  },
  {
    title: "It",
    genre: ["Horror"],
    _authorName: "Stephen King"
  },
  {
    title: "El Resplandor",
    genre: ["Horror", "Thriller"],
    _authorName: "Stephen King"
  },
  {
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    genre: ["Fantasy", "Adventure"],
    _authorName: "J.R.R. Tolkien"
  },
  {
    title: "El Hobbit",
    genre: ["Fantasy", "Adventure"],
    _authorName: "J.R.R. Tolkien"
  },
  {
    title: "Asesinato en el Orient Express",
    genre: ["Thriller", "Adventure"],
    _authorName: "Agatha Christie"
  },
  {
    title: "Diez negritos",
    genre: ["Thriller", "Horror"],
    _authorName: "Agatha Christie"
  },
  {
    title: "Los pilares de la Tierra",
    genre: ["Historical", "Adventure"],
    _authorName: "Ken Follett"
  },
  {
    title: "Un mundo sin fin",
    genre: ["Historical"],
    _authorName: "Ken Follett"
  }
];

module.exports = books_data;