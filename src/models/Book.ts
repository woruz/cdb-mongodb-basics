import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId;
  genres: Types.ObjectId[];
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  },
  { timestamps: true },
);

export default mongoose.model<IBook>("Book", BookSchema);
