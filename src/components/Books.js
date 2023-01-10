import React, { useEffect, useState } from "react";
import { GetData } from "../service/ApiRequest";
import { Card } from "./Card";

export const Books = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await GetData();
      setData(data);
    })();
  }, []);

  return (
    <div className="container">
      <div>
        <button type="button">Books</button>
        <button type="button">Details</button>
      </div>
      {data?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
