import mongoose, { Schema } from "mongoose";
import { number, string } from "zod/v4";

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
  profileImageUrl: String,
  phoneNumber: number,
  addressId: ObjectId,
});

const addressSchema = new Schema({
  userId: ObjectId,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  zipCode: number,
});

const creatorSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
  profileImageUrl: String,
  phoneNumber: number,
  addressId: ObjectId,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
  chapters: [
    {
      number: Number,
      chapterName: String,
      chapterDescription: String,
      content: [ObjectId],
    },
  ],
});

const courseContentSchema = new Schema({
  courseId: ObjectId,
  chapterNumber: number,
  type: { type: String, required: true },
  content: String,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
  razorpay_order_id: String,
  razorpay_payment_id: String,
});

export const userModel = mongoose.model("user", userSchema);
export const creatorModel = mongoose.model("creator", creatorSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
export const addressModel = mongoose.model("address", addressSchema);
export const courseContentModel = mongoose.model(
  "courseContent",
  courseContentSchema
);

// module.export={
//     userModel,
//     creatorModel,
//     courseModel,
//     purchaseModel
// }
