import { Router } from "express";
import Author from "../models/Author";

const router = Router();

router.post("/", async (req, res) => {
  const author = await Author.create(req.body);
  res.json(author);
});

export default router;
