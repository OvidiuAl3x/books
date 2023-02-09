export const BooksStats = ({ data, setShowStats }) => {
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

  return (
    <div className="container-totalDetails">
      <p>
        Total Books Readed: <span>{totalBooks}</span>
      </p>
      <p>
        Total Chapters: <span>{totalChapters}</span>
      </p>

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
      <i
        class="fa-regular fa-circle-xmark"
        onClick={() => {
          setShowStats(false);
        }}
      ></i>
    </div>
  );
};
