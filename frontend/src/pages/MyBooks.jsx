import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function MyBooks() {
  const [data, setData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [refreshEffect, setRefreshEffect] = useState(false);

  const localStorageUsername = localStorage.getItem("usernameId");

  useEffect(() => {
    localStorageUsername != null &&
      axios
        .get(`http://localhost:5555/users/${localStorageUsername}`)
        .then(async (res) => {
          const data = await res.data.books;
          setData(data);
          setWishlist(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [localStorageUsername, refreshEffect]);

  // Function to add or remove a book from the user's wishlist
  const toggleWishlist = async (bookId) => {
    try {
      const isInWishlist = idWhislist.includes(bookId);

      if (isInWishlist) {
        // If the book is already in the wishlist, make a DELETE request to remove it
        await axios.delete(
          `http://localhost:5555/users/${localStorageUsername}/remove-from-wishlist/${bookId}`
        );
      } else {
        // If the book is not in the wishlist, make a POST request to add it
        await axios.post(
          `http://localhost:5555/users/${localStorageUsername}/add-to-wishlist/${bookId}`
        );
      }

      // Refresh the wishlist after adding or removing a book
      const res = await axios.get(
        `http://localhost:5555/users/${localStorageUsername}`
      );
      const updatedUser = res.data;

      // Assuming the user data returned includes the updated wishlist
      const updatedWishlist = updatedUser.books;
      setWishlist(updatedWishlist);

      // Update refreshEffect to trigger useEffect
      setRefreshEffect((prev) => !prev);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const idWhislist = wishlist.map((item) => item._id);
  const image = "http://localhost:5555/uploads/";

  return (
    <>
      {!localStorageUsername &&
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need to login to see your books!",
          showConfirmButton: false,
          footer:
            '<a href="/" class="text-xl hover:underline text-zinc-600 mx-1">Back</a> <a href="/login" class="text-2xl hover:underline text-blue-800 mx-1">Login</a>',
        })}
      {localStorageUsername && (
        <div>
          <p className="text-3xl text-center my-5"> My Books</p>
          <div className="flex m-auto">
            <div className="flex flex-wrap gap-5 justify-center w-[70%]  m-auto">
              {data?.map((item) => (
                <div
                  key={item._id}
                  className="w-[230px] h-[400px]  flex flex-col justify-between hover:scale-105 duration-300"
                >
                  <div>
                    <div className="flex justify-end ">
                      <FaHeart
                        className={`absolute  mt-2 mr-2 cursor-pointer ${
                          idWhislist.includes(item._id) && "text-red-500"
                        }`}
                        onClick={() => toggleWishlist(item._id)}
                      />
                    </div>
                    <img
                      src={`${image}${item.image}`}
                      alt={item.image}
                      className="w-[230px] rounded-[6px] shadow-lg"
                    />
                  </div>

                  <Link
                    to={`/books/details/${item._id}`}
                    className="flex flex-col items-center border-2 border-blue-400  rounded-[8px] shadow-lg "
                  >
                    <p>{item.title}</p>
                    <p>{item.author}</p>
                    <p>Publish Year: {item.publishYear}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyBooks;
