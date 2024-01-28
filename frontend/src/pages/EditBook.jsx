import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MdOutlineFileUpload } from "react-icons/md";
import Swal from "sweetalert2";

const EditBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    pages: "",
    language: "",
    description: "",
    image: null,
    categories: [], // Change categoryId to categoryIds
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const { title, author, publishYear, language, description, pages } = book;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5555/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchBookData();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    setBook({
      ...book,
      image: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;

    setBook((prevBook) => {
      if (prevBook.categories.includes(selectedCategoryId)) {
        // Category is already selected, so remove it
        return {
          ...prevBook,
          categories: prevBook.categories.filter(
            (category) => category !== selectedCategoryId
          ),
        };
      } else {
        // Category is not selected, so add it
        return {
          ...prevBook,
          categories: [...prevBook.categories, selectedCategoryId],
        };
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting book data:", book); // Log the book object

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishYear", publishYear);
    formData.append("pages", pages);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(book.categories));
    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5555/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Book Edited!",
        text: "Your book has been successfully saved.",
      }).then(() => {
        navigate(-1);
      });

      console.log("Book updated successfully:", response.data);
      // Optionally, redirect to a success page or perform other actions
    } catch (error) {
      if (error.response) {
        console.error("Error updating book:", error.response.data.message);
      } else {
        console.error("Error updating book:", error.message);
      }
    }
  };

  const image = `http://localhost:5555/uploads/${book.image}`;

  return (
    <div className="p-4 mb-10">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Edit Book</h1>
      <div className="flex mt-10 justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 border-2 p-6  shadow-2xl rounded-md w-[25em]"
        >
          <div className="flex flex-col gap-1">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 px-2 capitalize"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Author*</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 px-2 capitalize"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label> Publish Year*</label>
            <input
              type="text"
              name="publishYear"
              value={publishYear}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 p-2 capitalize"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Pages*</label>
            <input
              type="text"
              name="pages"
              value={pages}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 p-2 capitalize"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label> Language*</label>
            <select
              name="language"
              value={language}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 p-2"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Mandarin">Mandarin Chinese</option>
              <option value="Hindi">Hindi</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Bengali">Bengali</option>
              <option value="Japanese">Japanese</option>
              <option value="Russian">Russian</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              name="description"
              rows="5"
              value={description}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 px-2 capitalize"
            >
              Description*
            </textarea>
          </div>

          <label className="flex gap-2 items-center cursor-pointer w-fit border-2 px-4 py-2 border-blue-500 m-auto hover:-translate-y-1 duration-300">
            <MdOutlineFileUpload className="text-2xl" />
            Upload Image
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div>
            Categories:
            <div className="flex gap-2 mt-2 justify-center flex-wrap h-[10em] overflow-auto">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className={`cursor-pointer w-fit border-2 px-4 py-2 border-blue-500 hover:-translate-y-1 duration-300 ${
                    book.categories.includes(category._id) ? "bg-blue-300" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={category._id}
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                    className="hidden"
                    checked={book.categories.includes(category._id)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="p-2 bg-sky-500 m-8 rounded-md hover:-translate-y-1 duration-300"
          >
            Save Book
          </button>
        </form>
        {book.image !== undefined && (
          <div className="flex flex-col  border-2 p-6  shadow-2xl rounded-md w-[25em] items-center">
            <p className="text-center text-xl mb-2">Preview Image</p>
            {imagePreview ? (
              <img src={imagePreview} alt="Image Preview" />
            ) : (
              <img src={image} alt="Image Preview" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;
