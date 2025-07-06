import { TASK_STATUS } from "@/config/constants.js";
import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: (typeof TASK_STATUS)[number];
  dueDate: Date;
  project: mongoose.Types.ObjectId | string;
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}
