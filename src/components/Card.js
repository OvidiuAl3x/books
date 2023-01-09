export const Card = ({ item }) => {
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

  const { rereaded, chapters, title, review } = item;

  const a = rereaded >= 2 ? `${chapters} x ${rereaded}` : chapters;

  return (
    <div className="card-container">
      <img src={images[`${title}.jpg`]} height={100} width={100} />
      <h3>{title}</h3>
      <p>Chapters: {a}</p>
      <p>Icon: {review}</p>
    </div>
  );
};
