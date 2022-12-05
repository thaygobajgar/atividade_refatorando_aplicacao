import { Router } from "express";
import {
  createBookController,
  listBooksController,
  retrieveBookController,
} from "../controllers/books.controllers";
import verifyBookExistsMiddleware from "../middlewares/verifyBookExists.middleware";

const booksRoutes = Router();
booksRoutes.post("", createBookController);
booksRoutes.get("", listBooksController);
booksRoutes.get("/:id", verifyBookExistsMiddleware, retrieveBookController);
export default booksRoutes;
