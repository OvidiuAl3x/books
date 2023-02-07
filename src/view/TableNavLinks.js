import { Route, Routes } from "react-router-dom";
import { BooksDetails } from "./BooksDetails";

const TableNavLinks = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<BooksDetails />}></Route>
        <Route path="new" element={<BooksDetails />}></Route>
        <Route path=":id" element={<BooksDetails />}></Route>
      </Routes>
    </>
  );
};

export default TableNavLinks;
