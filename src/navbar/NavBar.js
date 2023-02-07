import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { BooksCard } from "../components/BooksCard";
import { Books } from "../view/Books";
import TableNavLinks from "../view/TableNavLinks";
import { NavLinks } from "./NavLinks";

export const NavBar = () => {
  return (
    <BrowserRouter>
      <NavLinks />
      <Routes>
        <Route exact path="/" element={<Books />}>
          <Route exact path="/" element={<BooksCard />}></Route>
        </Route>
        <Route path="/table/*" element={<TableNavLinks />}></Route>
        <Route path="*" element={<Navigate to="" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
