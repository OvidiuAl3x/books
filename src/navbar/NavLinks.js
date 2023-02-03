import { NavLink } from "react-router-dom";

export const NavLinks = () => {
  return (
    <nav className="navBar">
      <NavLink to="">Books</NavLink>
      <NavLink to="/table">Table</NavLink>
    </nav>
  );
};
