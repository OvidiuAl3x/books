import { useState } from "react";
import ReactPaginate from "react-paginate";

const PER_PAGE = 8;

export const Pagination = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE

  const currentPageData = data.slice(offset, offset + PER_PAGE).map((item) => item.componenta)

  const pageCount = Math.ceil(data.length / PER_PAGE)

  return(
    <>
     {currentPageData}
     <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={pageCount}
        onPageChange={handlePageClick}

        containerClassName="pagination"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"

        // pageRangeDisplayed={3}
        // marginPagesDisplayed={2}
        // pageClassName="page-item"
        // pageLinkClassName="page-link"
        // previousClassName="page-item"
        // nextClassName="page-item"
        // breakLabel="..."
        // breakClassName="page-item"
        // breakLinkClassName="page-link"
        // renderOnZeroPageCount={null}
     ></ReactPaginate>
    </>
  )
 

};
