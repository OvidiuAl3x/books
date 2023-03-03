import { useState } from "react";
import { NavLink } from "react-router-dom";

export const UserAcc = () => {
  const [profile, setProfile] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const username = JSON.parse(localStorage.getItem("username"));

  return (
    <>
      {!token ? (
        <NavLink to="/login" style={{ marginLeft: "auto" }}>
          Login
        </NavLink>
      ) : (
        <>
          {profile && (
            <div
              className="user"
              style={{
                marginLeft: "auto",
              }}
            >
              <p className="username">{username}</p>
              <p onClick={handleLogout} className="logout">
                Logout
              </p>
            </div>
          )}
          <div
            style={{
              fontSize: "30px",
              marginTop: "3px",
              marginRight: "50px",
              marginLeft: !profile ? "auto" : "",
            }}
          >
            <i
              class="fa-regular fa-user"
              style={{ color: "#00F9F9", cursor: "pointer" }}
              onClick={() => setProfile(!profile)}
            ></i>
          </div>
        </>
      )}
    </>
  );
};
