export const BooksTableCard = ({ item, index }) => {
  const {
    id,
    title,
    chapters,
    chaptersReread,
    review,
    genres,
    details,
    status,
  } = item;

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

  const colorStatus =
    status === "Complete" ? "#24D60C" : status === "Dropped" ? "red" : "yellow";

  const image = images[`${title}.jpg`]
    ? images[`${title}.jpg`]
    : "https://via.placeholder.com/150/000000/00F9F9/?text=NoImage";

  const a = ".table".length;

  return (
    <tbody>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>
          <img src={image} height={60} width={60} alt="photo2" />
        </td>
        <td>{title}</td>
        <td>{chapters}</td>
        <td>{chaptersReread}</td>
        <td>
          {review}
          <i class="fa-solid fa-star"></i>
        </td>
        <td>{genres}</td>
        <td style={{ color: `${colorStatus}` }}>{status}</td>
        <td>{details}</td>
        <td>
          <i class="fa-solid fa-ban"></i>
        </td>
        <td>
          <i class="fa-sharp fa-solid fa-wrench"></i>
        </td>
      </tr>
    </tbody>
  );
};
