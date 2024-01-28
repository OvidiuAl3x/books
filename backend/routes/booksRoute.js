import express from "express";
import Book from "../models/bookModel.js";
import multer from "multer";
import path from "path";
import Category from "../models/categoryModel.js";
import { promises as fsPromises } from "fs";
import mongoose from "mongoose";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName =
      req.body.title.replace(/\s/g, "") + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Route for Save a new Book
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Check if category IDs are provided in the request
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publish year",
      });
    }

    const categoryId = JSON.parse(req.body.categories);

    // Ensure that categoryIds is always an array
    if (!Array.isArray(categoryId)) {
      categoryId = [categoryId];
    }

    // Convert categoryIds to an array of ObjectId instances
    const categoryObjectIds = categoryId.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const categories = await Category.find({
      _id: { $in: categoryObjectIds },
    });

    // Check if all categories are found
    if (categories.length !== categoryId.length) {
      return res.status(404).send({
        message: "One or more categories not found",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      pages: req.body.pages,
      language: req.body.language,
      description: req.body.description,
      image: req.file ? req.file.filename : undefined,
      categories: categoryObjectIds, // Save array of categoryIds as ObjectId instances
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for GET ALL Books from the database with filters and search
router.get("/", async (req, res) => {
  try {
    let filter = {};

    // Check if search query is provided
    if (req.query.search) {
      const searchQuery = req.query.search;
      const searchRegex = new RegExp(searchQuery, "i");
      filter.$or = [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
      ];
    }

    // Check if title filter is provided
    if (req.query.title) {
      const titleRegex = new RegExp(req.query.title, "i");
      filter.title = { $regex: titleRegex }; // Case-insensitive partial match
    }

    if (req.query.author) {
      const authors = req.query.author.split(","); // Assuming authors are provided as a comma-separated string
      filter.author = { $in: authors.map((author) => new RegExp(author, "i")) }; // Case-insensitive search for each author
    }

    if (req.query.publishYear) {
      const publishYear = req.query.publishYear.split(",").map(Number); // Convert to array of numbers
      filter.publishYear = { $in: publishYear };
    }

    // Check if categories filter is provided
    if (req.query.categories) {
      const categoryIds = req.query.categories.split(","); // Assuming category IDs are provided as a comma-separated string
      filter.categories = { $in: categoryIds };
    }

    const books = await Book.find(filter);

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for GET One Book from the database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
      .populate("reviews")
      .populate("categories");

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if all required fields are present
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.categories
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title, author, publish year, categoryIds",
      });
    }

    // Log req.file before processing
    console.log("req.file:", req.file);

    // Fetch the existing book data to get the previous image path
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create an object to update
    const updateObject = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      pages: req.body.pages,
      language: req.body.language,
      description: req.body.description,
      categories: existingBook.categories,
    };

    // Check if a new image was provided
    if (req.file) {
      // If there's a previous image, delete it
      if (existingBook.image) {
        const previousImagePath = path.join("uploads", existingBook.image);

        // Check if the previous image file exists before trying to delete it
        try {
          await fsPromises.access(previousImagePath);
          await fsPromises.unlink(previousImagePath);
        } catch (error) {
          console.error("Error deleting previous image:", error.message);
          return res
            .status(500)
            .send({ message: "Error deleting previous image" });
        }
      }

      // Add the path of the new image to the update object
      updateObject.image = req.file.filename;
    }

    // Log updateObject after processing
    console.log("updateObject:", existingBook.image);

    const categoryId = JSON.parse(req.body.categories);

    // Find categories using the $in operator
    const categories = await Category.find({ _id: { $in: categoryId } });

    if (categories.length !== categoryId.length) {
      return res.status(404).send({
        message: "One or more categories not found",
      });
    }

    // Add category IDs to the update object
    updateObject.categories = categories.map((category) => category._id);

    const result = await Book.findByIdAndUpdate(id, updateObject);
    console.log("Received data:", req.body);
    console.log("Constructed updateObject:", updateObject);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID to get the image filename
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If the book has an associated image, delete it
    if (book.image) {
      const imagePath = path.join("uploads", book.image);

      // Check if the image file exists before trying to delete it
      try {
        await fsPromises.access(imagePath);
        await fsPromises.unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image:", error.message);
        return res.status(500).send({ message: "Error deleting image" });
      }
    }

    // Delete the book from the database
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
