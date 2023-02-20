import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateData, GetDataID, UpdateData } from "../service/ApiRequest";
import { EditGenres } from "./EditGenres";

const reTitle = /^[A-Za-z0-9\s]*$/;

export const EditBooks = ({ setShowForm }) => {
  const { id } = useParams();
  const [errorForm, setErrorForm] = useState(false);

  const [form, setForm] = useState({
    author: "",
    language: "",
    pages: "",
    title: "",
    img_title: "",
    genres: [],
    year: "1900",
    review: "1",
  });

  const { title, pages, review, language, author, year } = form;

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
      form.pages > 0 &&
      form.pages < 9999 &&
      form.year >= 0 &&
      form.year < 2080
    ) {
      try {
        await CreateData(form);
        alert(`Created ${form.title}`);
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
      form.pages > 0 &&
      form.pages < 9999 &&
      form.year >= 0 &&
      form.year < 2080
    ) {
      try {
        await UpdateData(form);
        alert(`Updated ${form.title}`);
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
            <Link to="/mybooks">
              <i class="fa-solid fa-x" onClick={() => setShowForm(false)}></i>
            </Link>
          </div>

          {!id ? <h3>Add New Book</h3> : <h3>Update Book</h3>}
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
            <label for="title" style={{ marginTop: "10px" }}>
              Author
            </label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => updateField(target)}
              className={errorForm ? "error-form" : ""}
            />
            {errorForm && <p className="error-message">Please insert author</p>}
            <label for="year" style={{ marginTop: "10px" }}>
              Year
            </label>
            <input
              type="number"
              name="year"
              value={year}
              onChange={({ target }) => updateField(target)}
              className={year >= 2080 ? "error-form" : ""}
              min="1"
              max="2050"
            />
            {year >= 2050 ? (
              <p className="error-message">Year range between 1-2080</p>
            ) : null}
            <label for="pages" style={{ marginTop: "10px" }}>
              Pages
            </label>
            <input
              type="number"
              name="pages"
              value={pages}
              onChange={({ target }) => updateField(target)}
              className={pages >= 9999 ? "error-form" : ""}
              min="1"
              max="9999"
            />
            {pages >= 9999 ? (
              <p className="error-message">Pages range between 1-9999</p>
            ) : null}
            <label for="review" style={{ marginTop: "10px" }}>
              Review (1 - 5): <span style={{ color: "white" }}>{review}</span>
            </label>
            <input
              type="range"
              id="review"
              name="review"
              min="1"
              max="5"
              onChange={({ target }) => updateField(target)}
              value={review}
            />
            <label for="language" style={{ marginTop: "10px" }}>
              Language
            </label>
            <input
              type="text"
              name="language"
              value={language}
              onChange={({ target }) => updateField(target)}
            />
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
