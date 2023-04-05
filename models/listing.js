import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
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
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number],
      },
    },
    photo: {
      type: String,
      trim: true,
      maxlength: 160,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
