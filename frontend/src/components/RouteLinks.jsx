import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBooks from "../pages/CreateBooks";
import ShowBook from "../pages/ShowBook";
import EditBook from "../pages/EditBook";
import BooksTable from "../pages/BooksTable";
import Home from "../pages/Home";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyAccount from "../pages/MyAccount";

function RouteLinks() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/tableBooks" element={<BooksTable />}></Route>
      <Route path="/myBooks" element={<MyBooks />}></Route>
      <Route path="/books/create" element={<CreateBooks />}></Route>
      <Route path="/books/details/:id" element={<ShowBook />}></Route>
      <Route path="/books/edit/:id" element={<EditBook />}></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/myAccount" element={<MyAccount />}></Route>
    </Routes>
  );
}

export default RouteLinks;
