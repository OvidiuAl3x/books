// routes/categoryRoutes.js
import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

// Route for GET ALL Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for GET One Category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for Save a new Category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ message: "Name is required for a category" });
    }

    const newCategory = await Category.create({ name });
    return res.status(201).send(newCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ message: "Name is required for a category" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return res.status(200).send(updatedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a Category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
