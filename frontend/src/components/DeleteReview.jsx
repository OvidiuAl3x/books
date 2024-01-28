import axios from "axios";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

function DeleteReview({ reviewId, setBook, setIsEditing }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDeleteReview = async (reviewId) => {
    try {
      // Send a request to delete the review
      await axios.delete(
        `http://localhost:5555/books/${id}/reviews/${reviewId}`
      );

      // Reload the book data after deleting the review
      setLoading(true);
      const response = await axios.get(`http://localhost:5555/books/${id}`);
      setBook(response.data);
      setLoading(false);
      setIsEditing(false);
      // Update the reviews state
      // setReview(response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MdOutlineDelete
      className="text-xl text-red-600 cursor-pointer hover:scale-125 duration-300"
      onClick={() => handleDeleteReview(reviewId)}
    />
  );
}

export default DeleteReview;
