import express from "express";
import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";

const router = express.Router();

// POST a new review
router.post("/:bookId/reviews", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment, userName, userID } = req.body;

    // Check if userName is provided
    if (!userName || !userID) {
      return res.status(400).json({ error: "User name is required" });
    }

    const review = new Review({
      user: userName,
      userId: userID,
      book: bookId,
      rating,
      comment,
    });

    await review.save();

    // Update the book model to include the new review
    await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: review._id } },
      { new: true }
    );

    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all reviews for a specific book
router.get("/:bookId/reviews", async (req, res) => {
  try {
    const { bookId } = req.params;

    // Populate the reviews for the book
    const book = await Book.findById(bookId).populate("reviews");

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ reviews: book.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update a review
router.put("/:bookId/reviews/:reviewId", async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const { rating, comment, userName, userID } = req.body;

    // Check if userName is provided
    if (!userName || !userID) {
      return res.status(400).json({ error: "User name is required" });
    }

    // Find the review to be updated
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment, user: userName, userId: userID },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a review
router.delete("/:bookId/reviews/:reviewId", async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;

    // Find the review to be deleted
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Remove the reference to the review from the book model
    await Book.findByIdAndUpdate(bookId, { $pull: { reviews: reviewId } });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
