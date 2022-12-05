import express, { json } from "express";
import booksRoutes from "./routers/books.routes";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use("/books", booksRoutes);
export default app;
