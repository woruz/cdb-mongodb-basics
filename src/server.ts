import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";

import authorRoutes from "./routes/author.routes";
import genreRoutes from "./routes/genre.routes";
import bookRoutes from "./routes/book.routes";

const app = express();
app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);
app.use("/books", bookRoutes);

app.listen(process.env.PORT || 3000, async () => {
  await connectDB();
  console.log("Server running");
});
