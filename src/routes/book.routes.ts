import { Router } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const router = Router();

router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

// List books by author
router.get("/author/:authorId", async (req, res) => {
  const books = await Book.aggregate([
    { $match: { author: new mongoose.Types.ObjectId(req.params.authorId) } },
  ]);
  res.json(books);
});

// List books by genre
router.get("/genre/:genreId", async (req, res) => {
  const books = await Book.aggregate([
    { $match: { genres: new mongoose.Types.ObjectId(req.params.genreId) } },
  ]);
  res.json(books);
});

// Fetch single book with author, genres & total books count
router.get("/:id", async (req, res) => {
  const book = await Book.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    {
      $lookup: {
        from: "books",
        localField: "author._id",
        foreignField: "author",
        as: "authorBooks",
      },
    },
    {
      $addFields: {
        "author.totalBooks": { $size: "$authorBooks" },
      },
    },
    {
      $lookup: {
        from: "genres",
        localField: "genres",
        foreignField: "_id",
        as: "genres",
      },
    },
    { $unwind: "$genres" },
    {
      $lookup: {
        from: "books",
        localField: "genres._id",
        foreignField: "genres",
        as: "genreBooks",
      },
    },
    {
      $addFields: {
        "genres.totalBooks": { $size: "$genreBooks" },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        author: { $first: "$author" },
        genres: { $push: "$genres" },
      },
    },
    {
      $project: {
        authorBooks: 0,
        genreBooks: 0,
      },
    }
  ]);

  res.json(book[0]);
});

router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

export default router;
