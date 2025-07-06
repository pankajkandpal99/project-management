import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  status: "ACTIVE" | "COMPLETED" | "PLANNING" | "ONHOLD";
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}
