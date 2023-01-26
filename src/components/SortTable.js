import { useState } from "react";

export const SortChapters = ({ data, setData }) => {
  const [sortData, setSortData] = useState("asc");
  const [iconAsc, setIconAsc] = useState(true);

  const sort = () => {
    const copyArray = [...data];

    copyArray.sort((a, b) => {
      const sort = sortData === "asc" ? 1 : -1;
      return sort * parseInt(b.chapters) - parseInt(a.chapters);
    });

    setData(copyArray);
  };

  return (
    <th>
      {iconAsc ? (
        <div
          className="table-sort"
          onClick={() => {
            sort();
            setSortData("desc");
            setIconAsc(false);
          }}
        >
          <p>Chapters</p>
          <i class="fa-solid fa-arrow-down"></i>
        </div>
      ) : (
        <div
          className="table-sort"
          onClick={() => {
            sort();
            setSortData("asc");
            setIconAsc(true);
          }}
        >
          <p>Chapters</p>
          <i class="fa-solid fa-arrow-up"></i>
        </div>
      )}
    </th>
  );
};
export const SortReview = ({ data, setData }) => {
  const [sortData, setSortData] = useState("asc");
  const [iconAsc, setIconAsc] = useState(true);

  const sort = () => {
    const copyArray = [...data];

    copyArray.sort((a, b) => {
      const sort = sortData === "asc" ? 1 : -1;
      return sort * parseInt(b.review) - parseInt(a.review);
    });

    setData(copyArray);
  };

  return (
    <th>
      {iconAsc ? (
        <div
          className="table-sort"
          onClick={() => {
            sort();
            setSortData("desc");
            setIconAsc(false);
          }}
        >
          <p>Review</p>
          <i class="fa-solid fa-arrow-down"></i>
        </div>
      ) : (
        <div
          className="table-sort"
          onClick={() => {
            sort();
            setSortData("asc");
            setIconAsc(true);
          }}
        >
          <p>Review</p>
          <i class="fa-solid fa-arrow-up"></i>
        </div>
      )}
    </th>
  );
};
