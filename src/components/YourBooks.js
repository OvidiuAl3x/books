import { useEffect, useState } from "react";
import { GetMyBooks, MyBooks } from "../service/ApiRequest";

export const YourBooks = ({ id, filteredList }) => {
  const [myBooks, setMyBooks] = useState({});
  const [data, setData] = useState({});

  const addMyBooks = async (id) => {
    const dataBook = filteredList.find((item) => item.id === id);
    setMyBooks({ ...myBooks, dataBook });
    try {
      await MyBooks(myBooks);
      console.log("work");
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await GetMyBooks();
      setData(data);
    })();
  }, []);

  const a = data.map((item) => item.dataBook.title);
  const b = filteredList.map((item) => item.title);

  console.log(b);
  if (a in b) {
    return (
      <div className="container-bookmark" onClick={() => addMyBooks(id)}>
        <p>
          <br />B<br />O<br />O<br />K
        </p>
      </div>
    );
  }

  return (
    <div className="container-bookmark" onClick={() => addMyBooks(id)}>
      <p>
        A<br />D<br />D <br />
        <br />B<br />O<br />O<br />K
      </p>
    </div>
  );
};
