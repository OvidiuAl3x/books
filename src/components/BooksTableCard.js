import { Link } from "react-router-dom";
import { DeleteData } from "../service/ApiRequest";

export const BooksTableCard = ({ item, index }) => {
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
      ? "#169905"
      : status === "dropped"
      ? "#cc0606"
      : "#d8db03";

  const image = images[`${title}.jpg`]
    ? images[`${title}.jpg`]
    : "https://via.placeholder.com/150/000000/00F9F9/?text=NoImage";

  const handleDelete = (id) => {
    DeleteData(id);
  };

  return (
    <>
      <tr key={id}>
        <td
          style={{ backgroundColor: `${colorStatus}`, padding: "3.3px" }}
        ></td>
        <td>{index + 1}</td>
        <td>
          <img src={image} height={60} width={60} alt="photo2" />
        </td>
        <td>{title}</td>
        <td>{chapters}</td>
        <td>{chaptersReread}</td>
        <td>
          {review}
          <i class="fa-solid fa-star"></i>
        </td>
        <td>{genres}</td>
        <td>{details}</td>
        <td>
          <i class="fa-solid fa-ban" onClick={() => handleDelete(id)}></i>
        </td>
        <td>
          <Link to={`${id}`}>
            <i class="fa-sharp fa-solid fa-wrench"></i>
          </Link>
        </td>
      </tr>
    </>
  );
};
