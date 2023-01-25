import {  Route, Routes } from "react-router-dom";
import { BooksTable } from "./BooksTable";
import { EditBooks } from "./EditBooks";

const TableNavLinks = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<BooksTable />}></Route>
        <Route path="new" element={<EditBooks />}></Route>
        <Route path=":id" element={<EditBooks />}></Route>
      </Routes>
    </>
  );
};

export default TableNavLinks;
