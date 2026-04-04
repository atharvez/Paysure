import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  members: string[];
}

const schema = new Schema<IGroup>({
  name: String,
  members: [String],
});

export default mongoose.models.Group ||
  mongoose.model<IGroup>("Group", schema);