import express, { json } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(json());

const books = [];

const getLastId = () => {
  const sortedBooks = books.sort(
    (bookA, bookB) => parseInt(bookA.id) > parseInt(bookB.id)
  );

  if (!sortedBooks.length) {
    return 1;
  }

  const lastId = sortedBooks.at(-1).id;

  return parseInt(lastId) + 1;
};

const verifyBookExistsMiddleware = (req, res, next) => {
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  return next();
};

const createBookService = (payload) => {
  const foundBook = books.find((b) => b.name === payload.name);

  if (foundBook) {
    return [409, { message: "Book already exists!" }];
  }

  payload.id = getLastId().toString();

  books.push(payload);

  return [201, payload];
};

const retrieveBookService = (bookId) => {
  const book = books.find((b) => b.id === bookId);
  return book;
};

const createBookController = (req, res) => {
  const [status, data] = createBookService(req.body);
  return res.status(status).json(data);
};

const listBooksController = (req, res) => {
  return res.status(200).json(books);
};

const retrieveBookController = (req, res) => {
  const book = retrieveBookService(req.params.id);

  return res.status(200).json(book);
};

app.post("/books", createBookController);
app.get("/books", listBooksController);
app.get("/books/:id", verifyBookExistsMiddleware, retrieveBookController);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
