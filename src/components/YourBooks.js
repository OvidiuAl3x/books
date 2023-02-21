import { useState } from "react";

export const YourBooks = ({ id, filteredList }) => {
  const [a, setA] = useState(JSON.parse(localStorage.getItem(id)) || false);

  const addMyBooks = (id) => {
    const dataBook = filteredList.find((item) => item.id === id);
    const local = localStorage.setItem(id, JSON.stringify(dataBook));
    //todo alerta de add
    setA(!a);
  };

  const removeBooks = (id) => {
    const dataBook = filteredList.find((item) => item.id === id);
    localStorage.removeItem(id);
    setA(!a);
  };
  return (
    <>
      {a ? (
        <div className="container-bookmark" onClick={() => removeBooks(id)}>
          <p>
            A<br />D<br />D<br />E<br />D
          </p>
        </div>
      ) : (
        <div
          className="container-bookmark"
          onClick={() => {
            addMyBooks(id);
          }}
        >
          <p>
            A<br />D<br />D <br />
            <br />B<br />O<br />O<br />K
          </p>
        </div>
      )}
    </>
  );
};
