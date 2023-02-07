import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteData } from "../service/ApiRequest";
import { DeleteBooks } from "./DeleteBooks";

export const BooksTableCard = ({ item, setShowForm }) => {
  const [deleteBook, setDeleteBook] = useState(false);
  const {
    id,
    title,
    chapters,
    chaptersReread,
    review,
    genres,
    details,
    status,
  } = item;

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context("../photo/", false, /\.(png|jpe?g|svg)$/)
  );

  const colorStatus =
    status === "complete"
      ? "#2de215"
      : status === "dropped"
      ? "#cc0606"
      : status === "on going"
      ? "#d8db03"
      : "grey";

  const image = images[`${title}.jpg`]
    ? images[`${title}.jpg`]
    : "https://placehold.co/300x300/black/white?text=No+Image";

  const handleDelete = (id) => {
    DeleteData(id);
    alert(`You Deleted: ${title}`);
    window.location.reload(true);
  };

  const confirmationDelete = () => {
    setDeleteBook(true);
  };

  return (
    <>
      <tr key={id}>
        <td>
          <span
            style={{ backgroundColor: `${colorStatus}` }}
            className="span-status"
          ></span>
          <img
            src={image}
            height={60}
            width={60}
            alt="photo2"
            className="img-zoom"
          />
        </td>
        <td style={{ minWidth: "100px", maxWidth: "100px" }}>{title}</td>
        <td>{chapters}</td>
        <td>{chaptersReread}</td>
        <td>
          {review}
          <i class="fa-solid fa-star"></i>
        </td>
        <td>
          <div className="genres-container">
            {genres.map((item) => (
              <span className="genres-align">{item}</span>
            ))}
          </div>
        </td>
        <td>{details}</td>
        <td>
          {deleteBook ? (
            <DeleteBooks
              handleDelete={handleDelete}
              id={id}
              setDeleteBook={setDeleteBook}
            />
          ) : (
            <i class="fa-solid fa-ban" onClick={confirmationDelete}></i>
          )}
        </td>
        <td>
          <Link to={`${id}`}>
            <i
              class="fa-sharp fa-solid fa-wrench"
              onClick={() => setShowForm(true)}
            ></i>
          </Link>
        </td>
      </tr>
    </>
  );
};
