// userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/usersModel.js";
import Book from "../models/bookModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "user", // Assuming the role is always 'user' for new accounts
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get user details by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("books");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password } = req.body;

    // Hash the password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the credentials are valid, create a JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h", // Token expiration time
    });

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: false,
      // You can add other cookie options as needed (e.g., secure: true for HTTPS)
    });

    // Respond with a success message or user details
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// In your userRoutes.js or a separate routes file
router.post("/logout", (req, res) => {
  try {
    // Clear user's token by clearing the cookie
    res.clearCookie("token");

    // Respond with a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a book to the user's wishlist
router.post("/:userId/add-to-wishlist/:bookId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Add the book ID to the user's wishlist
    user.books.push(bookId);
    await user.save();

    res.status(200).json({ message: "Book added to wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove a book from the user's wishlist
router.delete("/:userId/remove-from-wishlist/:bookId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the book exists
    const bookIndex = user.books.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found in the wishlist" });
    }

    // Remove the book ID from the user's wishlist
    user.books.splice(bookIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Book removed from wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
