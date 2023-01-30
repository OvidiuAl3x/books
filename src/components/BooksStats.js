export const BooksStats = ({ setShowStats, data }) => {
  const chapters = data.reduce((a, b) => a + parseInt(b.chapters), 0);
  const chaptersRereaded = data.reduce(
    (a, b) => a + parseInt(b.chaptersReread),
    0
  );
  const totalChapters = chapters + chaptersRereaded;

  const totalBooks = data.length;

  const lowReviewStar = data.filter((item) => item.review < "4");
  const lowReview = lowReviewStar.length;
  const mediumReviewStar = data.filter(
    (item) => item.review >= "4" && item.review < "5"
  );
  const mediumReview = mediumReviewStar.length;
  const highReviewStar = data.filter(
    (item) => item.review >= "5" && item.review < "6"
  );
  const highReview = highReviewStar.length;
  const topReviewStar = data.filter((item) => item.review >= "6");
  const topReview = topReviewStar.length;

  return (
    <div className="container-totalDetails" onClick={() => setShowStats(false)}>
      <p>
        Total Books Readed: <span>{totalBooks}</span>
      </p>
      <p>
        Total Chapters: <span>{totalChapters}</span>
      </p>
      <p>
        1-3 <i class="fa-solid fa-star"></i>: <span>{lowReview}</span>
      </p>
      <p>
        4 <i class="fa-solid fa-star"></i>:<span>{mediumReview}</span>
      </p>
      <p>
        5 <i class="fa-solid fa-star"></i>: <span>{highReview}</span>
      </p>
      <p>
        6 <i class="fa-solid fa-star"></i>: <span>{topReview}</span>
      </p>
    </div>
  );
};
