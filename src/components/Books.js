import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetData } from "../service/ApiRequest";
import { BooksCard } from "./BooksCard";

const PER_PAGE = 8;

export const Books = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const uniqueIds = [];
  const uniquesRecipe = data.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);
    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }
    return false;
  });

  const currentPageData = uniquesRecipe
    .slice(offset, offset + PER_PAGE)
    .map((item) => <BooksCard key={item.id} item={item} />);

  const pageCount = Math.ceil(data.length / PER_PAGE);


  return (
    <>
      <div className="container">{currentPageData}</div>
      <ReactPaginate
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"page-link-active"}
        disabledClassName={"page-link-disabled"}
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
      />
    </>
  );
};
