import books from "../../database";
const retrieveBookService = (bookId) => {
  const book = books.find((b) => b.id === bookId);
  return book;
};

export default retrieveBookService;
