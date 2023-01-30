import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { GetData } from "../service/ApiRequest";
import { BooksStats } from "./BooksStats";
import { BooksTableCard } from "./BooksTableCard";
import { SortChapters, SortReview } from "./SortTable";

const PER_PAGE = 8;

export const BooksTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showStats, setShowStats] = useState(false);

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
    .map((item) => <BooksTableCard key={item.id} item={item} />);

  const pageCount = Math.ceil(data.length / PER_PAGE);

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
          {showStats && <BooksStats setShowStats={setShowStats} data={data} />}

          <div className="table-container">
            <form>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
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

                <tbody>{currentPageData}</tbody>
              </table>
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
            </form>
          </div>
        </>
      )}
    </>
  );
};
