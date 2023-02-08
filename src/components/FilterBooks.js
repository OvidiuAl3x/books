import { useEffect, useState } from "react";
import { GetDataGenres } from "../service/ApiRequest";

export const FilterBooks = ({ setSelectedCategory, selectedCategory }) => {
  const [dataGenres, setDataGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await GetDataGenres();
      setDataGenres(data);
    })();
  }, []);

  return (
    <>
      {!selectedCategory ? (
        <p onClick={() => setSelectedCategory()}>
          <i class="fa-solid fa-eye"></i>All
        </p>
      ) : (
        <p onClick={() => setSelectedCategory()}>
          <i class="fa-solid fa-eye-slash"></i>All
        </p>
      )}

      {dataGenres.map((item) => (
        <>
          {selectedCategory === item ? (
            <p
              onClick={() => setSelectedCategory(item)}
              style={{ backgroundColor: "red" }}
            >
              <i class="fa-solid fa-eye"></i>
              {item}
            </p>
          ) : (
            <>
              <p onClick={() => setSelectedCategory(item)}>
                <i class="fa-solid fa-eye-slash"></i>
                {item}
              </p>
            </>
          )}
        </>
      ))}
    </>
  );
};

{
  /* <label for={item} className="checkbox">
<input
  id={item}
  name="genres"
  type="checkbox"
  value={item}
  onClick={() => setSelectedCategory(item)}
/>
{item}
</label> */
}
