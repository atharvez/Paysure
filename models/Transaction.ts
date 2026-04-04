import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  payer: string;
  amount: number;
  groupId: string;
  category?: string;
  createdAt: Date;
  splits: {
    userId: string;
    amount: number;
  }[];
}

const schema = new Schema<ITransaction>({
  payer: String,
  amount: Number,
  groupId: String,
  category: String,
  createdAt: Date,
  splits: [
    {
      userId: String,
      amount: Number,
    },
  ],
});

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", schema);