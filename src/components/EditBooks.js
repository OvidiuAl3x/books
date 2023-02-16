import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreateData, GetDataID, UpdateData } from "../service/ApiRequest";
import { EditGenres } from "./EditGenres";

const reTitle = /^[A-Za-z0-9\s]*$/;

export const EditBooks = ({ setShowForm }) => {
  const { id } = useParams();
  const [errorForm, setErrorForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    chapters: "1",
    chaptersReread: "0",
    review: "1",
    details: "",
    status: "",
    genres: [],
  });

  const { title, chapters, chaptersReread, review, details, status } = form;
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        try {
          const data = await GetDataID(id);
          setForm(data);
        } catch (err) {
          console.warn(`EditBooks.js data error${err}`);
        }
      })();
    }
  }, [id]);

  const updateField = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    if (
      reTitle.test(form.title) &&
      !title.length < 1 &&
      form.chapters > 0 &&
      form.chapters < 9999 &&
      form.chaptersReread >= 0 &&
      form.chaptersReread < 9999 &&
      form.status
    ) {
      try {
        await CreateData(form);
        alert(`Created ${form.title}`);
        navigate(`/table`);
        window.location.reload(true);
      } catch (err) {
        console.warn(err);
      }
    }
    return setErrorForm(true);
  };

  const handleUpdate = async () => {
    if (
      reTitle.test(form.title) &&
      !title.length < 1 &&
      form.chapters > 0 &&
      form.chapters < 9999 &&
      form.chaptersReread >= 0 &&
      form.chaptersReread < 9999 &&
      form.status
    ) {
      try {
        await UpdateData(form);
        alert(`Updated ${form.title}`);
        navigate(`/table`);
        window.location.reload(true);
      } catch (e) {
        console.warn(e);
      }
    }
    return setErrorForm(true);
  };

  if (form === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="add-containerParent">
        <div className="add-containerChild">
          <div className="close-form">
            <Link to="/bookmarks">
              <i class="fa-solid fa-x" onClick={() => setShowForm(false)}></i>
            </Link>
          </div>

          <h3>Add New Book</h3>
          <form className="form-container">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => updateField(target)}
              className={errorForm ? "error-form" : ""}
            />
            {errorForm && <p className="error-message">Please insert title</p>}
            <label for="chapters">Chapters</label>
            <input
              type="number"
              name="chapters"
              value={chapters}
              onChange={({ target }) => updateField(target)}
              className={chapters >= 9999 ? "error-form" : ""}
              min="1"
              max="9999"
            />
            {chapters >= 9999 ? (
              <p className="error-message">Chapters range between 1-9999</p>
            ) : null}
            <label for="chaptersReread">Chapters Reread</label>
            <input
              type="number"
              name="chaptersReread"
              value={chaptersReread}
              onChange={({ target }) => updateField(target)}
              className={chaptersReread >= 9999 ? "error-form" : ""}
            />
            {chaptersReread >= 9999 && (
              <p className="error-message">Chapters range between 0-9999</p>
            )}
            <label for="review">
              Review (1 - 6): <span style={{ color: "white" }}>{review}</span>
            </label>
            <input
              type="range"
              id="review"
              name="review"
              min="1"
              max="6"
              onChange={({ target }) => updateField(target)}
              value={review}
            />
            <label for="details">Details</label>
            <input
              type="text"
              name="details"
              value={details}
              onChange={({ target }) => updateField(target)}
            />
            <select
              name="status"
              onChange={({ target }) => updateField(target)}
              className={errorForm ? "error-form" : ""}
            >
              <option value={status}>Status Selected: {status}</option>
              <option value="complete">Complete</option>
              <option value="on going">On Going</option>
              <option value="dropped">Dropped</option>
            </select>
            {errorForm && <p className="error-message">Please select status</p>}
            <p className="genres">Please Select Genres:</p>
            <EditGenres form={form} setForm={setForm} />
          </form>

          {!id ? (
            <button
              type="button"
              onClick={handleCreate}
              className="form-button"
            >
              Create
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUpdate}
              className="form-button"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};
