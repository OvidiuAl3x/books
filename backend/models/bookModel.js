import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      enum: [
        "English",
        "Spanish",
        "Mandarin",
        "Hindi",
        "Portuguese",
        "Bengali",
        "Japanese",
        "Russian",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", bookSchema);

export default Book;
