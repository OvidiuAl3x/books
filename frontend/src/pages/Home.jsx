import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [authorParams, setAuthorParams] = useState("");
  const [categoriesParams, setCategoriesParams] = useState("");
  const [publishYearParams, setPublishYearParams] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const localStorageRole = localStorage.getItem("usernameId");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5555/books/?search=${encodeURIComponent(
          search
        )}&author=${authorParams}&categories=${categoriesParams}&publishYear=${publishYearParams}`
      )
      .then(async (res) => {
        const data = await res.data.data;
        setData(data);

        const user = async () => {
          // Fetch wishlist data after fetching book data
          const wishlistRes = await axios.get(
            `http://localhost:5555/users/${localStorageRole}`
          );
          const updatedUser = wishlistRes.data;
          // Assuming the user data returned includes the updated wishlist
          const updatedWishlist = updatedUser.books;
          setWishlist(updatedWishlist);
        };

        localStorageRole != null && user();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authorParams, categoriesParams, publishYearParams, search]);

  // Function to add or remove a book from the user's wishlist
  const toggleWishlist = async (bookId) => {
    try {
      const isInWishlist = idWhislist.includes(bookId);

      if (isInWishlist) {
        // If the book is already in the wishlist, make a DELETE request to remove it
        await axios.delete(
          `http://localhost:5555/users/${localStorageRole}/remove-from-wishlist/${bookId}`
        );
      } else {
        // If the book is not in the wishlist, make a POST request to add it
        await axios.post(
          `http://localhost:5555/users/${localStorageRole}/add-to-wishlist/${bookId}`
        );
      }

      // Refresh the wishlist after adding or removing a book
      const res = await axios.get(
        `http://localhost:5555/users/${localStorageRole}`
      );
      const updatedUser = res.data;

      // Assuming the user data returned includes the updated wishlist
      const updatedWishlist = updatedUser.books;

      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const idWhislist = wishlist.map((item) => item._id);

  const image = "http://localhost:5555/uploads/";
  const cookie = document.cookie;

  return (
    <div>
      <p className="text-3xl text-center my-5">Books</p>
      <div className="flex justify-between flex-col lg:flex-row">
        <Filter
          setSearch={setSearch}
          authorParams={authorParams}
          setAuthorParams={setAuthorParams}
          categoriesParams={categoriesParams}
          setCategoriesParams={setCategoriesParams}
          publishYearParams={publishYearParams}
          setPublishYearParams={setPublishYearParams}
        />
        <div className="flex flex-wrap justify-center gap-10  lg:w-[80%] lg:ml-10 ">
          {data.map((item) => (
            <div
              key={item._id}
              className="w-[200px]  lg:w-[250px] lg:h-[400px] flex flex-col justify-between my-6  hover:scale-105 duration-300 gap-5"
            >
              <div>
                <div className="flex justify-end ">
                  <div
                    className="absolute mt-2 mr-2 cursor-pointer bg-slate-400 rounded-full p-[5px]"
                    onClick={() =>
                      cookie
                        ? toggleWishlist(item._id)
                        : Swal.fire("You need to login to add to favorites!")
                    }
                  >
                    <FaHeart
                      className={` ${
                        cookie && idWhislist.includes(item._id)
                          ? "text-red-500"
                          : "text-zinc-100"
                      }`}
                    />
                  </div>
                </div>
                <img
                  src={`${image}${item.image}`}
                  alt={item.image}
                  className="min-w-[200px] max-w-[200px] min-h-[280px] max-h-[280px] lg:min-w-[250px] lg:max-w-[250px] lg:min-h-[350px] lg:max-h-[350px]  rounded-[6px] shadow-lg"
                />
              </div>

              <Link
                to={`/books/details/${item._id}`}
                className="flex flex-col items-center text-center gap-2  border-2 border-blue-400  rounded-[8px] shadow-lg "
              >
                <p className="text-balance">{item.title}</p>
                <p>{item.author}</p>
                <p>Publish Year: {item.publishYear}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
