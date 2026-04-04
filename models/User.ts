import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", schema);