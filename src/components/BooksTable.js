import { useState } from "react";
import { AddBooks } from "./AddBooks";
import { BooksTableCard } from "./BooksTableCard";

export const BooksTable = ({ data }) => {
  const [addBooks, setAddBooks] = useState(false);

  const [form, setForm] = useState({
    title: "",
    chapters: "",
    chaptersReread: "",
    review: "",
    details: "",
    status: "",
    genres: [],
  });

  const displayForm = () => {
    setAddBooks(true);
  };

  return (
    <>
      {addBooks && (
        <AddBooks setAddBooks={setAddBooks} form={form} setForm={setForm} />
      )}

      <div className="table-container">
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

          {data?.map((item) => (
            <BooksTableCard
              key={item.id}
              item={item}
              // index={index}
              form={form}
            />
          ))}
        </table>
      </div>
    </>
  );
};
