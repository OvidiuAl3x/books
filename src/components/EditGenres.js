import { useEffect, useState } from "react";
import { GetDataGenres } from "../service/ApiRequest";

export const EditGenres = ({ form, setForm }) => {
  const { genres } = form;
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await GetDataGenres();
      setData(data);
    })();
  }, []);

  const addGenres = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        genres: [...genres, value],
      });
    } else {
      setForm({
        ...form,
        genres: genres.filter((e) => e !== value),
      });
    }
  };

  console.log(genres);

  return (
    <div className="container-formGenres">
      {data.map((item) => (
        <>
          {genres.filter((genres) => genres === item).length >= 1 ? (
            <label
              for={item}
              className="checkbox"
              style={{ opacity: "1", fontWeight: "600" }}
            >
              <input
                id={item}
                name="genres"
                type="checkbox"
                value={item}
                onChange={addGenres}
              />
              {item}
            </label>
          ) : (
            <label for={item} className="checkbox">
              <input
                id={item}
                name="genres"
                type="checkbox"
                value={item}
                onChange={addGenres}
              />
              {item}
            </label>
          )}
        </>
      ))}
    </div>
  );
};
