import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDataID, CreateData } from "../service/ApiRequest";

export const AddBooks = ({ setAddBooks }) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    chapters: "",
    chaptersReread: "",
    review: "",
    details: "",
    status: "",
    genres: [],
  });

  const { title, chapters, chaptersReread, review, details, status, genres } =
    form;

  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        try {
          const data = await GetDataID(id);
          setForm(data);
        } catch (err) {
          console.warn("Eroare get data");
        }
      })();
    }
  }, [id]);

  const updateField = ({ name, value }) => {
    if (value.length == 0) {
      alert("asd");
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const { id } = await CreateData(form);
      alert(`Created ${form.title}`);
      setAddBooks(false)
      window.location.reload(true)
    } catch (e) {
      console.warn(`Eroare Create`);
    }
  };

  const hideForm = () => {
    setAddBooks(false);
  };

  return (
    <>
      <div className="add-containerParent">
        <div className="add-containerChild">
          <i class="fa-solid fa-x" onClick={hideForm}></i>
          <h3>Add New Book</h3>
          <form className="form-container">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              required
              onChange={({ target }) => updateField(target)}
            />
            <input
              type="text"
              name="chapters"
              placeholder="Chapters"
              value={chapters}
              onChange={({ target }) => updateField(target)}
              required
            />
            <input
              type="text"
              name="chaptersReread"
              placeholder="Chapters Reread"
              value={chaptersReread}
              onChange={({ target }) => updateField(target)}
            />
            <input
              type="number"
              name="review"
              placeholder="Review"
              value={review}
              onChange={({ target }) => updateField(target)}
              required
            />
            <input
              type="text"
              name="details"
              placeholder="Details"
              value={details}
              onChange={({ target }) => updateField(target)}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={status}
              onChange={({ target }) => updateField(target)}
              required
            />
            <input
              type="text"
              name="genres"
              placeholder="Genres"
              value={genres}
              onChange={({ target }) => updateField(target)}
            />
            <i class="fa-solid fa-plus"></i>
          </form>

          <button type="button" onClick={handleCreate} className="form-button">
            Create
          </button>
        </div>
      </div>
    </>
  );
};
