import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    pages: "",
    language: "",
    description: "",
    image: null,
    categories: [], // Array to store selected categories
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5555/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

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

  const handleImageCancel = () => {
    setBook({ ...book, image: null });
    setImagePreview(null);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    const selectCateg = categories.find(
      (category) => category._id === selectedCategory
    );

    if (selectCateg) {
      if (!selectedCategoryName.includes(selectCateg.name)) {
        setSelectedCategoryName([...selectedCategoryName, selectCateg.name]);
      } else {
        const updatedCategories = selectedCategoryName.filter(
          (category) => category !== selectCateg.name
        );
        setSelectedCategoryName(updatedCategories);
      }
    }

    setBook({
      ...book,
      categories: book.categories.includes(selectedCategory)
        ? book.categories.filter((id) => id !== selectedCategory)
        : [...book.categories, selectedCategory],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("publishYear", book.publishYear);
    formData.append("pages", book.pages);
    formData.append("language", book.language);
    formData.append("description", book.description);

    // Append multiple category IDs to the form data
    formData.append("categories", JSON.stringify(book.categories)); // Convert to string

    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5555/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Book Saved!",
        text: "Your book has been successfully saved.",
      }).then(() => {
        navigate(-1);
      });

      console.log("Book created successfully:", response.data);

      // Optionally, redirect to a success page or perform other actions
    } catch (error) {
      if (error.response) {
        console.error("Error creating book:", error.response.data.message);
      } else {
        console.error("Error creating book:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mb-10">
      <BackButton />
      <h1 className="text-3xl my-4 text-center"> Create a Book</h1>
      {loading && <Spinner />}
      <div className="flex mt-10 justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 border-2 p-6  shadow-2xl rounded-md max-w-[29em]"
        >
          <div className="flex flex-col gap-1">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 p-2 capitalize"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Author*</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 p-2 capitalize"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            <div className="flex flex-col gap-1 ">
              <label> Publish Year*</label>
              <input
                type="number"
                name="publishYear"
                value={book.publishYear}
                onChange={handleInputChange}
                className="border-2 focus:outline-none border-blue-500 p-2 capitalize "
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label>Pages*</label>
              <input
                type="number"
                name="pages"
                value={book.pages}
                onChange={handleInputChange}
                className="border-2 focus:outline-none border-blue-500 p-2 capitalize"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label> Language*</label>
            <select
              name="language"
              value={book.language}
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
            <label>Description*</label>
            <textarea
              name="description"
              rows="5"
              value={book.description}
              onChange={handleInputChange}
              className="border-2 focus:outline-none border-blue-500 px-2 capitalize"
            ></textarea>
          </div>

          <div className="flex gap-1">
            <label className="flex gap-2 items-center justify-center cursor-pointer  border-2 h-full w-full border-blue-500 m-auto hover:-translate-y-1 duration-300">
              <MdOutlineFileUpload className="text-2xl" />
              Upload Image
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="flex flex-col gap-1 h-full w-full">
              <select
                name="categories"
                value=""
                onChange={(e) => handleCategoryChange(e)}
                className="border-2 focus:outline-none border-blue-500 p-2"
              >
                <option>Select Categories</option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className={`
                  w-fit
                  ${
                    book.categories.includes(category._id) ? "bg-zinc-300" : ""
                  }`}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategoryName.length > 0 && (
            <div className="">
              Selected Categories:
              <p>
                {selectedCategoryName.map((e, index) => (
                  <span key={index}>
                    {e}
                    {index < selectedCategoryName.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          )}
          <button
            type="submit"
            className="p-2 bg-sky-500 m-8 rounded-md hover:-translate-y-1 duration-300"
          >
            Save Book
          </button>
        </form>
        {imagePreview && (
          <div className="flex flex-col  border-2 p-6  shadow-2xl rounded-md w-[25em]">
            <p className="text-center text-xl mb-2">Selected Image:</p>
            <img src={imagePreview} alt="Image Preview" />
            <button
              type="button"
              onClick={handleImageCancel}
              className="p-2 bg-sky-500 m-8 rounded-md hover:-translate-y-1 duration-300"
            >
              Cancel Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBooks;
