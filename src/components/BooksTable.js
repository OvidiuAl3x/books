import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetData } from "../service/ApiRequest";
import { BooksTableCard } from "./BooksTableCard";
import { SortChapters, SortReview } from "./SortTable";

export const BooksTable = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  return (
    <>
      <div className="table-container">
        <form>
          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>#</th>
                <th>Image</th>
                <th>Title</th>
                <SortChapters setData={setData} data={data} />
                <th>Chapters 1st</th>
                <SortReview setData={setData} data={data} />
                <th>Genres</th>
                <th>Details</th>
                <th colSpan={2}>
                  <Link to="new">
                    <i class="fa-solid fa-square-plus"></i>
                  </Link>
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item, index) => (
                <BooksTableCard index={index} key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
