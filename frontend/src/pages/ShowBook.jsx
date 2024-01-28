import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const localStorageUsername = localStorage.getItem("usernameId");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const {
    title,
    author,
    publishYear,
    image,
    reviews,
    description,
    language,
    pages,
  } = book;

  const imageSrc = `http://localhost:5555/uploads/${image}`;
  const imagePlaceholder = `https://placehold.co/400x400/grey/C6C6C6?text=place+holder+image`;

  const canWriteReview = reviews?.some(
    (review) => review.userId === localStorageUsername
  );

  // Find the index of the user's review in the reviews array
  const userReviewIndex = reviews?.findIndex(
    (review) => review.userId === localStorageUsername
  );

  // If the user's review exists, move it to the beginning of the array
  if (userReviewIndex !== -1) {
    const userReview = reviews?.splice(userReviewIndex, 1)[0];
    reviews?.unshift(userReview);
  }
  const userReview =
    userReviewIndex !== -1 && userReviewIndex != undefined
      ? reviews[userReviewIndex]
      : null;

  return (
    <div className="p-4">
      <BackButton />

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between w-[60%] m-auto  gap-10 p-10 shadow-lg bg-slate-300 rounded-lg">
            <div className="flex m-auto">
              <img
                src={image !== undefined ? imageSrc : imagePlaceholder}
                alt="book image"
                width="350px"
                className="rounded-md"
              />
            </div>
            <div className="w-[100%]">
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Title</span>
                <span>{title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Author</span>
                <span>{author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Publish Year</span>
                <span>{publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Pages</span>
                <span>{pages}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Language</span>
                <span>{language}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-blue-800">Description</span>
                <span>{description}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-[60%] m-auto  gap-10 p-10 shadow-lg bg-slate-300 rounded-lg">
            <p className="text-2xl">Reviews</p>

            {(!canWriteReview && localStorageUsername) ||
            (isEditing && localStorageUsername) ? (
              <AddReview
                setBook={setBook}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                initialReview={userReview}
              />
            ) : null}

            {reviews
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((review, index) => (
                <Reviews
                  key={index}
                  review={review}
                  setBook={setBook}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  initialReview={userReview}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
