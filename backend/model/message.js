import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    nameUser: { type: String },
    content: { type: String, trim: true },
    type: { type: String },
    image: { type: String },
    // readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
