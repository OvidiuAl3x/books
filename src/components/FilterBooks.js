import { useEffect, useMemo, useState } from "react";
import { GetDataGenres } from "../service/ApiRequest";

export const FilterBooks = ({
  setSelectedCategory,
  selectedCategory,
  data,
  filteredList,
}) => {
  const [dataGenres, setDataGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await GetDataGenres();
      setDataGenres(data);
    })();
  }, []);

  return (
    <div className="container-filterHome">
      <div className="container-filterHomeChild">
        {!selectedCategory ? (
          <p
            onClick={() => setSelectedCategory()}
            style={{ fontWeight: "600" }}
          >
            <i class="fa-solid fa-eye" />
            All ({data.length})
          </p>
        ) : (
          <p onClick={() => setSelectedCategory()}>
            <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }} />
            All
          </p>
        )}

        {dataGenres.map((item) => (
          <>
            {selectedCategory === item ? (
              <p
                onClick={() => setSelectedCategory(item)}
                style={{ fontWeight: "600" }}
              >
                <i class="fa-solid fa-eye" />
                {item} ({filteredList.length})
              </p>
            ) : (
              <>
                <p onClick={() => setSelectedCategory(item)}>
                  <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }} />
                  {item}
                </p>
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
