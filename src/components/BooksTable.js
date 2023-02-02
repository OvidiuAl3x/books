import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { GetData } from "../service/ApiRequest";
import { BooksStats } from "./BooksStats";
import { BooksTableCard } from "./BooksTableCard";
import { SortChapters, SortDetails, SortReview } from "./SortTable";

const PER_PAGE = 6;

export const BooksTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showStats, setShowStats] = useState(false);
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

  const dataFilter = data.filter((item) => item.status === selectedCategory);

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
    .slice(offset, offset + PER_PAGE)
    .map((item) => <BooksTableCard key={item.id} item={item} />);

  const pageCount = !selectedCategory
    ? Math.ceil(data.length / PER_PAGE)
    : Math.ceil(dataFilter.length / PER_PAGE);

  if (currentPageData === null) {
    return <div>Loading ....</div>;
  }

  return (
    <>
      {currentPageData && (
        <>
          <h1 className="h1-totalDetails">Books Details</h1>
          <h3 className="p-totalDetails" onClick={() => setShowStats(true)}>
            Stats <i class="fa-solid fa-magnifying-glass"></i>
          </h3>
          {showStats && (
            <BooksStats
              setShowStats={setShowStats}
              data={data}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          )}

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th
                    onClick={() => setSelectedCategory()}
                    style={{ cursor: "pointer" }}
                  >
                    All
                  </th>
                  <th>Image</th>
                  <th>Title</th>
                  <SortChapters setData={setData} data={data} />
                  <th>Chapters 1st</th>
                  <SortReview setData={setData} data={data} />
                  <th>Genres</th>
                  <SortDetails setData={setData} data={data} />
                  <th colSpan={2}>
                    <Link to="new">
                      <i class="fa-solid fa-square-plus"></i>
                    </Link>
                  </th>
                </tr>
              </thead>

              <tbody>{currentPageData}</tbody>
            </table>
          </div>
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
      )}
    </>
  );
};
