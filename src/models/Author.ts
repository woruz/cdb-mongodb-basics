import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IAuthor>("Author", AuthorSchema);
