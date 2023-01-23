import { Fragment } from "react";
import { useState } from "react";
import { AddBooks } from "./AddBooks";
import { BooksTableCard } from "./BooksTableCard";
import { EditBooks } from "./EditBooks";

export const BooksTable = ({ data }) => {
  const [addBooks, setAddBooks] = useState(false);

  const [form, setForm] = useState({
    title: "",
    chapters: "",
    chaptersReread: "",
    review: "",
    details: "",
    status: "",
    genres: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    chapters: "",
    chaptersReread: "",
    review: "",
    details: "",
    status: "",
    genres: "",
  });

  const displayForm = () => {
    setAddBooks(true);
  };

  const [editBook, setEditBook] = useState(null);

  const handleEditForm = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditBook(newFormData);
  };

  const handleClickEdit = (e, form) => {
    e.preventDefault();
    setEditBook(form.id);

    const formValues = {
      title: form.title,
      chapters: form.chapters,
      chaptersReread: form.chaptersReread,
      review: form.review,
      details: form.details,
      status: form.status,
      genres: form.genres,
    };

    setEditFormData(formValues);
  };

  const editFormSubmit = (e) => {
    e.preventDefault();

    const editedBooks = {
      id: editBook,
      title: editFormData.title,
      chapters: editFormData.chapters,
      chaptersReread: editFormData.chaptersReread,
      review: editFormData.review,
      details: editFormData.details,
      status: editFormData.status,
      genres: editFormData.genres,
    };
    const newBooks = [...data];

    const index = data.findIndex((book) => book.id === editBook);

    newBooks[index] = editedBooks;

    setAddBooks(newBooks);
    setEditBook(null);
  };

  // const editFormSubmit = async () => {
  //   try {
  //     const { id } = await CreateData(form);
  //     alert(`Created ${form.title}`);
  //     setAddBooks(false);
  //     window.location.reload(true);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  //  https://www.youtube.com/watch?v=dYjdzpZv5yc
  // incepe de la inceput si gata

  return (
    <>
      {addBooks && (
        <AddBooks setAddBooks={setAddBooks} form={form} setForm={setForm} />
      )}
      <div className="table-container">
        <form onSubmit={editFormSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Chapters</th>
                <th>Chapters 1st</th>
                <th>Review</th>
                <th>Genres</th>
                <th>Details</th>
                <th colSpan={2}>
                  <i class="fa-solid fa-square-plus" onClick={displayForm}></i>
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item) => (
                <Fragment>
                  {editBook === item.id ? (
                    <EditBooks
                      editFormData={editFormData}
                      handleEditForm={handleEditForm}
                    />
                  ) : (
                    <BooksTableCard
                      key={item.id}
                      item={item}
                      setAddBooks={setAddBooks}
                      handleClickEdit={handleClickEdit}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
