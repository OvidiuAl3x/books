import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateData, GetDataID, UpdateData } from "../service/ApiRequest";

export const EditBooks = () => {
  const { id } = useParams();
  const [errorForm, setErrorForm] = useState(false);
  const reTitle = /^[A-Za-z0-9\s]*$/;
  const reChapters = /([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/;
  const reChaptersRereaded =
    /([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/;
  const reReview = /[1-6]/;

  const [form, setForm] = useState({
    title: "",
    chapters: "",
    chaptersReread: "0",
    review: "",
    details: "",
    status: "",
    genres: "",
  });

  const { title, chapters, chaptersReread, review, details, status, genres } =
    form;
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
      reChapters.test(form.chapters) &&
      form.chapters > 0 &&
      form.chaptersReread >= 0 &&
      reReview.test(form.review) &&
      reChaptersRereaded.test(form.chaptersReread) &&
      form.status
    ) {
      try {
        await CreateData(form);
        alert(`Created ${form.title}`);
        navigate(`/table`);
      } catch (err) {
        console.warn(err);
      }
    }
    return setErrorForm(true);
  };

  const handleUpdate = async () => {
    if (
      reTitle.test(form.title) &&
      form.title &&
      reChapters.test(form.chapters) &&
      form.chapters > 0 &&
      form.chaptersReread >= 0 &&
      reReview.test(form.review) &&
      reChaptersRereaded.test(form.chaptersReread) &&
      form.status
    ) {
      try {
        await UpdateData(form);
        alert(`Updated ${form.title}`);
        navigate(`/table`);
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
          <i class="fa-solid fa-x" onClick={() => navigate("/table")}></i>
          <h3>Add New Book</h3>
          <form className="form-container">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              required="required"
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
              required="required"
              className={errorForm ? "error-form" : ""}
            />
            {errorForm && (
              <p className="error-message">Chapters range between 1-9999</p>
            )}
            <label for="chaptersReread">Chapters Reread</label>
            <input
              type="number"
              name="chaptersReread"
              value={chaptersReread}
              onChange={({ target }) => updateField(target)}
            />
            {errorForm && (
              <p className="error-message">Chapters range between 0-9999</p>
            )}
            <label for="review">Review</label>
            <input
              type="number"
              name="review"
              value={review}
              onChange={({ target }) => updateField(target)}
              required="required"
              className={errorForm ? "error-form" : ""}
            />
            {errorForm && (
              <p className="error-message">Review range between 1-6</p>
            )}
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
            <label for="genres">Genres</label>
            <textarea
              type="text"
              name="genres"
              rows="10"
              cols="30"
              value={genres}
              onChange={({ target }) => updateField(target)}
            ></textarea>
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
