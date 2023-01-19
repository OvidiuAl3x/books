import { DeleteData } from "../service/ApiRequest";


// todo a simple popUp 
// todo mai sus de butonul de delete

export const DeleteBooks = ({ id, title, setDeleteBook }) => {
  const handleDelete = (id) => {
    DeleteData(id);
    // alert(`You delete ${title}`);
    window.location.reload(true);
  };

  const closeDelete = () => {
    setDeleteBook(false);
  };

  return (
    <div className="delete-containerParent">
      <div className="delete-containerChild">
        <i class="fa-solid fa-x" onClick={closeDelete}></i>
        <div className="confirmationText">
          <p>
            Are you sure you want to delete <span>{title}</span>?{" "}
          </p>
          <span> If you delete the book you can't recover it.</span>
        </div>

        <div className="buttonConfirmation">
          <button type="button" onClick={closeDelete} className="deleteNo">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleDelete(id)}
            className="deleteYes"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
