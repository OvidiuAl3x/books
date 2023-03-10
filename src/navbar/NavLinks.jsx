import { NavLink } from "react-router-dom";
import { UserAcc } from "../components/UserAcc";

export const NavLinks = () => {


  return (
    <nav className="navBar">
      <NavLink to="">Books</NavLink>
      <NavLink to="/myBooks">My Books</NavLink>
      <NavLink to="/admin">Edit Books</NavLink>
      <UserAcc/>
    </nav>
  );
};
