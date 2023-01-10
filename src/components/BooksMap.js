import { BooksCard } from "./BooksCard";

export const BooksMap = ({ data }) => (
  <>
    {data?.map((item) => (
      <BooksCard key={item.id} item={item} />
    ))}
  </>
);
