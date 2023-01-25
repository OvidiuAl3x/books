import React, { useEffect, useState } from "react";
import { GetData } from "../service/ApiRequest";
import { BooksCard } from "./BooksCard";

export const Books = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  return (
    <>
      <div className="container">
        {data?.map((item) => (
          <BooksCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};
