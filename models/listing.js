import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    userid: {
      type: ObjectId,
      ref: "user",
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
    },
    location: {
      coordinates: {
        type: [String],
      },
    },
    photo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
