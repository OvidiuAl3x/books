import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import usersRoute from "./routes/usersRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Category from "./models/categoryModel.js";

// npm run dev for runing the server

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow cookies to be sent
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome");
});

app.use("/books", booksRoute);
app.use("/categories", categoryRoute);
app.use("/users", usersRoute);
app.use("/books", reviewRoute);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
