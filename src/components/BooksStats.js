export const BooksStats = ({
  setShowStats,
  data,
  setSelectedCategory,
  selectedCategory,
}) => {
  const chapters = data.reduce((a, b) => a + parseInt(b.chapters), 0);
  const chaptersRereaded = data.reduce(
    (a, b) => a + parseInt(b.chaptersReread),
    0
  );
  const totalChapters = chapters + chaptersRereaded;

  const totalBooks = data.length;
  const lowReviewStar = data.filter((item) => item.review < "4").length;
  const mediumReviewStar = data.filter(
    (item) => item.review >= "4" && item.review < "5"
  ).length;
  const highReviewStar = data.filter(
    (item) => item.review >= "5" && item.review < "6"
  ).length;
  const topReviewStar = data.filter((item) => item.review >= "6").length;

  const onGoingStatus = data.filter(
    (item) => item.status === "on going"
  ).length;
  const droppedStatus = data.filter((item) => item.status === "dropped").length;
  const completeStatus = data.filter(
    (item) => item.status === "complete"
  ).length;

  return (
    <div className="container-totalDetails">
      <div className="container-totalDetails1">
        <p>
          Total Books Readed: <span>{totalBooks}</span>
        </p>
        <p>
          Total Chapters: <span>{totalChapters}</span>
        </p>
        <p
          onClick={() => {
            setSelectedCategory();
          }}
          style={{ cursor: "pointer", borderBottom: "1px solid white" }}
        >
          All
        </p>
        <p
          className="container-statusON"
          onClick={() => {
            setSelectedCategory("on going");
          }}
        >
          {selectedCategory === "on going" ? (
            <i class="fa-solid fa-eye"></i>
          ) : (
            <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
          )}
          On Going: <span>{onGoingStatus}</span>
        </p>
        <p
          className="container-statusDR"
          onClick={() => setSelectedCategory("dropped")}
        >
          {selectedCategory === "dropped" ? (
            <i class="fa-solid fa-eye"></i>
          ) : (
            <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
          )}
          Dropped: <span>{droppedStatus}</span>
        </p>
        <p
          className="container-statusCO"
          onClick={() => setSelectedCategory("complete")}
        >
          {selectedCategory === "complete" ? (
            <i class="fa-solid fa-eye"></i>
          ) : (
            <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
          )}
          Complete: <span>{completeStatus}</span>
        </p>

        <i
          class="fa-regular fa-circle-xmark"
          onClick={() => {
            setShowStats(false);
          }}
        ></i>
      </div>
      <div className="container-totalDetails1">
        <p>
          1-3 <i class="fa-solid fa-star"></i>: <span>{lowReviewStar}</span>
        </p>
        <p>
          4 <i class="fa-solid fa-star"></i>:<span>{mediumReviewStar}</span>
        </p>
        <p>
          5 <i class="fa-solid fa-star"></i>: <span>{highReviewStar}</span>
        </p>
        <p>
          6 <i class="fa-solid fa-star"></i>: <span>{topReviewStar}</span>
        </p>
      </div>
    </div>
  );
};
