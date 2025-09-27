import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    hashtags: [{ type: String, trim: true }],
    imageUrl: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Post", postSchema);
