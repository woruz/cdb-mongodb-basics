import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const GenreSchema = new Schema<IGenre>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IGenre>("Genre", GenreSchema);
