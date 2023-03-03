export const DeleteBooks = ({ handleDelete, id, setDeleteBook }) => {
  const closeDeleteButton = () => {
    setDeleteBook(false);
  };
  return (
    <div className="container-delete">
      <button type="button" onClick={closeDeleteButton} className="close">
        Close
      </button>
      <button type="button" onClick={() => handleDelete(id)} className="delete">
        Delete
      </button>
    </div>
  );
};
