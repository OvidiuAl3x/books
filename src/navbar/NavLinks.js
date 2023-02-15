import { NavLink } from "react-router-dom";

export const NavLinks = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="navBar">
      <NavLink to="">Books</NavLink>
      <NavLink to="/bookmarks">Your Books</NavLink>
      {!token ? (
        <NavLink to="/login" style={{ marginLeft: "auto" }}>
          Login
        </NavLink>
      ) : (
        <div
          style={{
            marginLeft: "auto",
            fontSize: "30px",
            marginTop: "3px",
          }}
        >
          <i
            class="fa-regular fa-user"
            style={{ color: "#00F9F9", cursor: "pointer" }}
            onClick={handleLogout}
          ></i>
        </div>
      )}
    </nav>
  );
};
