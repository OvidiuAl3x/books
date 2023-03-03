import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { GetData } from "../service/ApiRequest";
import { BooksStats } from "./BooksStats";
import { BooksTableCard } from "./BooksTableCard";
import { useDebounce } from "./DeabounceSearch";
import { SortPages, SortReview, SortYear } from "./SortTable";

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
      const dataSearch = data.filter(
        (el) =>
          el.author.toString().toLowerCase().trim().includes(deb) ||
          el.title.toString().toLowerCase().trim().includes(deb)
      );
      setData(dataSearch);
    })();
  }, [deb]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const dataFilter = data?.filter(
    (item) =>
      item.status === selectedCategory || item.review === selectedCategory
  );

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

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          Please{" "}
          <Link
            to="/login"
            style={{
              color: "#00F9F9",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Login
          </Link>{" "}
          to Continue
        </h1>
      </>
    );
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
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
              placeholder="Search..."
            />
          </div>

          {showStats && (
            <BooksStats
              setShowStats={setShowStats}
              data={data}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          )}

          {!filteredList.length <= 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Language</th>
                    <SortPages setData={setData} data={data} />

                    <th>Genres</th>
                    <SortYear setData={setData} data={data} />
                    <SortReview setData={setData} data={data} />
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
          ) : (
            <h2 style={{ textAlign: "center" }}>No Books found</h2>
          )}

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
