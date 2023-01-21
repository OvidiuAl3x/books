import { useState } from "react";
import { DeleteData, UpdateData } from "../service/ApiRequest";
import { AddBooks } from "./AddBooks";
import { DeleteBooks } from "./DeleteBooks";

export const BooksTableCard = ({ item, index, form, setAddBooks }) => {
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

  //* pop up set
  //  const [deleteBook, setDeleteBook] = useState(false);

  const colorStatus =
    status === "complete"
      ? "#169905"
      : status === "dropped"
      ? "#cc0606"
      : "#d8db03";

  const image = images[`${title}.jpg`]
    ? images[`${title}.jpg`]
    : "https://via.placeholder.com/150/000000/00F9F9/?text=NoImage";

  // const handleDelete = async (id) => {
  //   try {
  //     await DeleteData(id);
  //     alert(`delete ${form.title}`);
  //   } catch (e) {
  //     console.warn("nu merge2");
  //   }
  // };

  //* popup delete
  // const handleDelete = () => {
  //   setDeleteBook(true);
  // };

  const handleDelete = (id) => {
    DeleteData(id);
    alert(`You delete ${title}`);
    window.location.reload(true);
  };

  const handleUpdate = (id) => {
    // try {
    //   await UpdateData(form);
    //   alert(`Updated ${form.title}`);
    //   setAddBooks(true);
    // } catch (e) {
    //   console.warn("nu merge");
    // }
    UpdateData(id)
    console.log(id);
    setAddBooks(true)
    // return <AddBooks />;
  };
  // const handleUpdate = async () => {
  //   try {
  //     await UpdateData(form);
  //     alert(`Updated ${form.title}`);
  //   } catch (e) {
  //     console.warn("nu merge");
  //   }
  // };

  return (
    <>
      <tbody key={id}>
        <tr>
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

            {/* 
            for popup  delete
            <i class="fa-solid fa-ban" onClick={handleDelete}></i> 
            */}
          </td>
          <td>
            <i
              class="fa-sharp fa-solid fa-wrench"
              onClick={() => handleUpdate(id)}
            ></i>
          </td>
        </tr>
      </tbody>

      {/* styled diffrent for every data */}
      {/* {deleteBook && (
        <DeleteBooks id={id} title={title} setDeleteBook={setDeleteBook} />
      )} */}
    </>
  );
};
