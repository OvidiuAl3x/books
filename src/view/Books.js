import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetData, GetDataGenres } from "../service/ApiRequest";
import { BooksCard } from "../components/BooksCard";
import { FilterBooks } from "../components/FilterBooks";

const PER_PAGE = 8;

export const Books = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();

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

  const dataFilter = useMemo(() => {
    return data.filter((item) => {
      const bookGenres = item.genres.map((item) => item);
      return bookGenres.includes(selectedCategory);
    });
  });

  const getFilteredList = () => {
    if (!selectedCategory) {
      return data;
    }
    return dataFilter;
  };

  const filteredList = useMemo(getFilteredList, [
    selectedCategory,
    data,
    dataFilter,
  ]);

  const currentPageData = filteredList
    ?.slice(offset, offset + PER_PAGE)
    .map((item) => <BooksCard key={item.id} item={item} />);

  const pageCount = !selectedCategory
    ? Math.ceil(data?.length / PER_PAGE)
    : Math.ceil(dataFilter?.length / PER_PAGE);

  if (!data) {
    return <div>Loading ....</div>;
  }
  return (
    <div className="width-container">
      <FilterBooks
        data={data}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        filteredList={filteredList}
      />
      <div className="container">{currentPageData}</div>

      {data && (
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
      )}
    </div>
  );
};
