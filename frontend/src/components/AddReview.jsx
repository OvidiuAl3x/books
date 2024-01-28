import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useParams } from "react-router-dom";

function AddReview({ setBook, initialReview, isEditing, setIsEditing }) {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const localStorageUsername = localStorage.getItem("usernameId");

  useEffect(() => {
    if (isEditing && initialReview) {
      // If in edit mode, set initial values from the provided review
      setReview(initialReview.comment || ""); // Ensure initialReview.comment is not undefined
      setName(initialReview.user || "");
      setRating(initialReview.rating || 0);
    } else {
      // If not in edit mode, clear the state
      setReview("");
      setName("");
      setRating(0);
    }
  }, [isEditing, initialReview]);

  const handleReviewSubmit = async () => {
    try {
      if (isEditing) {
        // If in edit mode, send the updated review data to the server
        await axios.put(
          `http://localhost:5555/books/${id}/reviews/${initialReview._id}`,
          {
            rating,
            comment: review,
            userName: name,
            userID: localStorageUsername,
          }
        );

        // Clear the review, rating, and name inputs after submitting or updating
        setReview("");
        setRating(0);
        setName("");
        setIsEditing(false);
      } else {
        // If not in edit mode, send the new review data to the server
        await axios.post(`http://localhost:5555/books/${id}/reviews`, {
          rating,
          comment: review,
          userName: name,
          userID: localStorageUsername,
        });
      }

      // Reload the book data after submitting or updating the review
      setLoading(true);
      const response = await axios.get(`http://localhost:5555/books/${id}`);
      setBook(response.data);
      setLoading(false);

      // Update the reviews state
      setReview(response.data.reviews);

      // Clear the review, rating, and name inputs after submitting or updating
      setReview("");
      setRating(0);
      setName("");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[70%] m-auto gap-10">
      <p className="text-2xl">
        {isEditing ? "Edit Your Review" : "Write a Review"}
      </p>
      <div className="flex flex-col gap-3 w-full">
        <input
          type="text"
          placeholder="Write your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 rounded-md outline-none"
        />
        <textarea
          rows="5"
          placeholder="Write your comment here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="p-2 mb-2 rounded-md outline-none h-[200px]"
        />
        <div className="flex items-center mb-2">
          <p className="mr-2">Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <IoIosStar
              key={star}
              className={`cursor-pointer text-xl ${
                star <= rating ? "text-yellow-500 " : " text-white"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button
          onClick={handleReviewSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:-translate-y-1 duration-300 w-fit m-auto"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default AddReview;
