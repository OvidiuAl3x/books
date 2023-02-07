import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { BooksCard } from "../components/BooksCard";
import { Books } from "../view/Books";
import { BooksDetails } from "../view/BooksDetails";
import { NavLinks } from "./NavLinks";

export const NavBar = () => {
  return (
    <BrowserRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Books />}>
          <Route path="/" element={<BooksCard />}></Route>
        </Route>
        <Route path="/table" element={<BooksDetails />}>
          <Route path="new" element={<BooksDetails />}></Route>
          <Route path=":id" element={<BooksDetails />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
