import React from "react";
import { IoIosStar } from "react-icons/io";
import DeleteReview from "./DeleteReview";
import { FaEdit } from "react-icons/fa";

function Reviews({ review, setBook, setIsEditing }) {
  const localStorageUsername = localStorage.getItem("usernameId");
  const { _id, userId, user, rating, comment } = review;

  const userReview = userId === localStorageUsername;

  return (
    <div
      key={_id}
      className={`p-4 mb-4 max-w-[80%] min-w-[80%] ${
        userReview ? "border-2 rounded-md border-blue-800" : "border-b-2"
      }
                  `}
    >
      {userReview && (
        <div className="flex w-fit ml-auto items-center gap-2">
          <FaEdit
            onClick={() => setIsEditing(true)}
            className="text-lg cursor-pointer hover:scale-125 duration-300"
          />
          <DeleteReview
            reviewId={_id}
            setBook={setBook}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      <p className="font-bold">{user}</p>
      <div className="flex">
        {[...Array(rating)].map((_, index) => (
          <IoIosStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(5 - rating)].map((_, index) => (
          <IoIosStar key={index} className="text-white" />
        ))}
      </div>
      <p className="mt-4">{comment}</p>
    </div>
  );
}

export default Reviews;
