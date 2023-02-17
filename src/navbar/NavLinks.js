import { NavLink } from "react-router-dom";
import { UserAcc } from "../components/UserAcc";

export const NavLinks = () => {


  return (
    <nav className="navBar">
      <NavLink to="">Books</NavLink>
      <NavLink to="/mybooks">Your Books</NavLink>
      <UserAcc/>
    </nav>
  );
};
