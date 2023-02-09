import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { GetData } from "../service/ApiRequest";
import { BooksStats } from "./BooksStats";
import { BooksTableCard } from "./BooksTableCard";
import { useDebounce } from "./DeabounceSearch";
import { SortChapters, SortDetails, SortReview } from "./SortTable";
import { StatusFilter } from "./StatusFilter";

const PER_PAGE = 8;

export const BooksTable = ({ setShowForm }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [search, setSearch] = useState("");
  const deb = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      const data = await GetData();
      const dataSearch = data.filter((el) =>
        el.title.toString().toLowerCase().trim().includes(deb)
      );
      setData(dataSearch);
    })();
  }, [deb]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const dataFilter = data?.filter((item) => item.status === selectedCategory);

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
    ?.map((item) => (
      <BooksTableCard key={item.id} item={item} setShowForm={setShowForm} />
    ));

  const pageCount = !selectedCategory
    ? Math.ceil(data?.length / PER_PAGE)
    : Math.ceil(dataFilter?.length / PER_PAGE);

  if (!data) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="width-container">
      {currentPageData && (
        <>
          <h1 className="h1-totalDetails">Books Details</h1>
          <div className="container-totalDetailsFilter">
            <h3
              className="p-totalDetails"
              onClick={() => setShowStats(!showStats)}
            >
              Stats <i class="fa-solid fa-magnifying-glass"></i>
            </h3>
            <StatusFilter
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              data={data}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
              placeholder="Search"
            />
          </div>

          {showStats && <BooksStats setShowStats={setShowStats} data={data} />}

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <SortChapters setData={setData} data={data} />
                  <th>Chapters 1st</th>
                  <SortReview setData={setData} data={data} />
                  <th>Genres</th>
                  <SortDetails setData={setData} data={data} />
                  <th colSpan={2}>
                    <Link to="new">
                      <i
                        class="fa-solid fa-square-plus"
                        onClick={() => setShowForm(true)}
                      ></i>
                    </Link>
                  </th>
                </tr>
              </thead>

              <tbody>{currentPageData}</tbody>
            </table>
          </div>
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
        </>
      )}
    </div>
  );
};
