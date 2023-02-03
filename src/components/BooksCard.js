import Stars from "react-stars-display";

export const BooksCard = ({ item }) => {
  // add all images
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context("../photo/", false, /\.(png|jpe?g|svg)$/)
  );

  const { chapters, title, review, id, status, genres } = item;

  const reviewStar = review >= 6 ? "#FF0000" : "#4EFF00";

  const statusBorderColor =
    status === "complete"
      ? "#169905"
      : status === "dropped"
      ? "#cc0606"
      : "#d8db03";

  const image = images[`${title}.jpg`]
    ? images[`${title}.jpg`]
    : "https://placehold.co/300x300/black/white?text=No+Image";

  return (
    <div className="card-container" key={id}>
      <div className="card-flip-box-inner">
        <div className="card-flip-box-front">
          <div className="star">
            <Stars stars={review} size={20} spacing={5} fill={reviewStar} />
          </div>

          <img src={image} height={250} width={250} alt={title} />
        </div>
        <div className="card-flip-box-back">
          <h3>{title}</h3>
          <p>
            <strong>Chapters:</strong> {chapters}
          </p>
          <p>
            <strong>Genres: </strong>
            {genres}
          </p>
          <p>
            <strong>status: </strong>
            <span style={{ color: `${statusBorderColor}` }}>{status}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
