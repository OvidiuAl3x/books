import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetData } from "../service/ApiRequest";
import { BooksCard } from "../components/BooksCard";
import { FilterBooks } from "../components/FilterBooks";
import { useDebounce } from "../components/DeabounceSearch";
import { MyBooks } from "./MyBooks";

const PER_PAGE = 8;

export const Books = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [search, setSearch] = useState("");

  const deb = useDebounce(search, 50);

  useEffect(() => {
    (async () => {
      const data = await GetData();
      const dataSearch = data.filter(
        (el) =>
          el.title.toString().toLowerCase().trim().includes(deb) ||
          el.author.toString().toLowerCase().trim().includes(deb)
      );
      setData(dataSearch);
    })();
  }, [deb]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const dataFilter = useMemo(() => {
    return data?.filter((item) => {
      const bookGenres = item.genres.map((item) => item);
      return bookGenres.includes(selectedCategory);
    });
  });

  const getFilteredList = () => {
    return !selectedCategory ? data : dataFilter;
  };

  const filteredList = useMemo(getFilteredList, [
    selectedCategory,
    data,
    dataFilter,
  ]);

  const currentPageData = filteredList
    ?.slice(offset, offset + PER_PAGE)
    .map((item) => (
      <BooksCard key={item.id} item={item} filteredList={filteredList} />
    ));
   

  const pageCount = !selectedCategory
    ? Math.ceil(data?.length / PER_PAGE)
    : Math.ceil(dataFilter?.length / PER_PAGE);

  return (
    <div className="width-container">
      <FilterBooks
        data={data}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        filteredList={filteredList}
        setSearch={setSearch}
        search={search}
        setData={setData}
      />
      {data.length <= 0 ? (
        <>
          <h2>We didn't find the book: {search}</h2>
          <h3>Please try something else!</h3>
        </>
      ) : (
        <>
          <div className="container">{currentPageData}</div>

          {pageCount >= 2 ? (
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
          ) : null}
        </>
      )}
    </div>
  );
};
