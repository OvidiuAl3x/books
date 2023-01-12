import { BooksTableCard } from "./BooksTableCard";

export const BooksTable = ({ data }) => {
  return (
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
              <i class="fa-solid fa-square-plus"></i>
            </th>
          </tr>
        </thead>

        {data?.map((item, index) => (
          <BooksTableCard key={item.id} item={item} index={index} />
        ))}
      </table>
    </div>
  );
};
