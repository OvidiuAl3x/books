export const BooksTableCard = ({ item }) => {
  const { id, title, chapters, chaptersReread, review, genres, details } = item;
  return (
    <tbody>
      <tr key={id}>
        <td>{title}</td>
        <td>{chapters}</td>
        <td>{chaptersReread}</td>
        <td>{review}</td>
        <td>{genres}</td>
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
