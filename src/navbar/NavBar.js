import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import TableNavLinks from "../components/TableNavLinks";
import { Books } from "../components/Books";
import { BooksCard } from "../components/BooksCard";
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
