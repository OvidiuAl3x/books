export const BooksStats = ({
  data,
  setShowStats,
  setSelectedCategory,
  selectedCategory,
}) => {
  const pages = data.reduce((a, b) => a + parseInt(b.pages), 0);

  const totalBooks = data.length;
  const lowReviewStar1 = data.filter((item) => item.review === "1").length;
  const lowReviewStar2 = data.filter((item) => item.review === "2").length;
  const lowReviewStar3 = data.filter((item) => item.review === "3").length;
  const mediumReviewStar = data.filter((item) => item.review === "4").length;
  const highReviewStar = data.filter((item) => item.review === "5").length;

  return (
    <div className="container-totalDetails">
      <p>
        Total Books: <span>{totalBooks}</span>
      </p>
      <p>
        Total Pages: <span>{pages}</span>
      </p>
      <p onClick={() => setSelectedCategory("")} style={{ cursor: "pointer" }}>
        All Books
      </p>
      <p>
        1{" "}
        <i
          class="fa-solid fa-star"
          onClick={() => setSelectedCategory("1")}
          style={{
            color: selectedCategory === "1" ? "#ffff00" : "black",
            cursor: "pointer",
          }}
        ></i>
        :<span>{lowReviewStar1}</span>
      </p>
      <p>
        2{" "}
        <i
          class="fa-solid fa-star"
          onClick={() => setSelectedCategory("2")}
          style={{
            color: selectedCategory === "2" ? "#ffff00" : "black",
            cursor: "pointer",
          }}
        ></i>
        :<span>{lowReviewStar2}</span>
      </p>
      <p>
        3{" "}
        <i
          class="fa-solid fa-star"
          onClick={() => setSelectedCategory("3")}
          style={{
            color: selectedCategory === "3" ? "#ffff00" : "black",
            cursor: "pointer",
          }}
        ></i>
        :<span>{lowReviewStar3}</span>
      </p>
      <p>
        4{" "}
        <i
          class="fa-solid fa-star"
          onClick={() => setSelectedCategory("4")}
          style={{
            color: selectedCategory === "4" ? "#ffff00" : "black",
            cursor: "pointer",
          }}
        ></i>
        :<span>{mediumReviewStar}</span>
      </p>
      <p>
        5{" "}
        <i
          class="fa-solid fa-star"
          onClick={() => setSelectedCategory("5")}
          style={{
            color: selectedCategory === "5" ? "#ffff00" : "black",
            cursor: "pointer",
          }}
        ></i>
        : <span>{highReviewStar}</span>
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
