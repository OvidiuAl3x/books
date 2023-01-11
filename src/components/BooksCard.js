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

  const { rereaded, chapters, title, review, id } = item;

  const totalChapthers = rereaded >= 2 ? `${chapters} x ${rereaded}` : chapters;

  const reviewStar = review >= 6 ? "#FF0000" : "#4EFF00";

  return (
    <div className="card-container" key={id}>
      <div className="star">
        <Stars stars={review} size={20} spacing={5} fill={reviewStar} />
      </div>

      <img src={images[`${title}.jpg`]} height={200} width={200} alt={title} />

      <h3>{title}</h3>
      <p>
        <strong>Chapters:</strong> {totalChapthers}
      </p>
    </div>
  );
};
