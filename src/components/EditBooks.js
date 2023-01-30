import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateData, GetDataID, UpdateData } from "../service/ApiRequest";

export const EditBooks = () => {
  const { id } = useParams();

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
    try {
      await CreateData(form);
      alert(`Created ${form.title}`);
      navigate(`/table`);
    } catch (err) {
      console.warn(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await UpdateData(form);
      alert(`Updated ${form.title}`);
      navigate(`/table`);
    } catch (e) {
      console.warn(e);
    }
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
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              required
              onChange={({ target }) => updateField(target)}
            />
            <input
              type="number"
              name="chapters"
              placeholder="Chapters"
              value={chapters}
              onChange={({ target }) => updateField(target)}
              required
            />
            <input
              type="number"
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
            <select
              name="status"
              onChange={({ target }) => updateField(target)}
            >
              <option value={status}>Status Selected: {status}</option>
              <option value="complete">Complete</option>
              <option value="on going">On Going</option>
              <option value="dropped">Dropped</option>
            </select>
            <textarea
              type="text"
              name="genres"
              rows="10"
              cols="15"
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
