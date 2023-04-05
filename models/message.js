import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    fromuserid: {
      type: ObjectId,
      ref: "user",
    },
    touserid: {
      type: ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
