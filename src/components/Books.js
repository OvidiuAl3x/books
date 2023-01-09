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
      {data?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
