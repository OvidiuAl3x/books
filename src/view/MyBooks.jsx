import { useState } from "react";
import { useEffect } from "react";
import { GetData } from "../service/ApiRequest";
import Stars from "react-stars-display";
import { Link } from "react-router-dom";

export const MyBooks = ({ filteredList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  const a = data?.map((item) => <Favorite item={item} />);
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          Please{" "}
          <Link
            to="/login"
            style={{
              color: "#00F9F9",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Login
          </Link>{" "}
          to Continue
        </h1>
      </>
    );
  }
  return (
    <div className="width-container">
      <div className="container">{a}</div>
    </div>
  );
};

const Favorite = ({ item }) => {
  const a = JSON.parse(localStorage.getItem(item.id));
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context("../photo/", false, /\.(png|jpe?g|svg)$/)
  );

  const { pages, title, review, id, author, genres, language, img_title } =
    item;

  const image = images[`${img_title}.jpg`]
    ? images[`${img_title}.jpg`]
    : "https://placehold.co/250x320/black/white?text=No+Image";

  return (
    <>
      {a ? (
        <div className="card-container" key={id}>
          <div className="card-flip-box-inner">
            <div className="card-flip-box-front">
              <div className="star">
                <Stars stars={review} size={20} spacing={5} fill="yellow" />
              </div>

              <img src={image} height={320} width={250} alt={title} />
            </div>
            <div className="card-flip-box-back">
              {/* <YourBooks id={id} filteredList={filteredList} item={item} /> */}
              <h3>{title}</h3>
              <p>
                <strong>Author:</strong> {author}
              </p>
              <p>
                <strong>Pages:</strong> {pages}
              </p>
              <p>
                <strong>Language:</strong> {language}
              </p>

              <p>
                <strong>Genres: </strong>
              </p>
              <div className="genres-Books">
                {genres.map((item) => (
                  <span className="genres-alignBooks">{item} </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
