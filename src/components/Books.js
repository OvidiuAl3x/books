import React, { useEffect, useState } from "react";
import { GetData } from "../service/ApiRequest";
import { BooksMap } from "./BooksMap";
import { BooksTable } from "./BooksTable";

const PAGE_BOOKS = "books";
const PAGE_TABLE = "table";

export const Books = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(PAGE_BOOKS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  return (
    <>
      <div className="page-navigation">
        <p onClick={() => navigateTo(PAGE_BOOKS)}>
          Books
        </p>
        <p onClick={() => navigateTo(PAGE_TABLE)}>
          Details
        </p>
      </div>
      <div className="container">
        {page === PAGE_BOOKS && <BooksMap data={data} />}
        {page === PAGE_TABLE && <BooksTable />}
      </div>
    </>
  );
};
