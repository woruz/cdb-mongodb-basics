import { Router } from "express";
import Genre from "../models/Genre";

const router = Router();

router.post("/", async (req, res) => {
  const genre = await Genre.create(req.body);
  res.json(genre);
});

export default router;
