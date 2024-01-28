import React, { useState } from "react";
import { ImBooks } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function NavBar() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const cookie = document.cookie;
  const localStorageRole = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5555/users/logout");

      // Check if the logout was successful
      if (response.status === 200) {
        console.log("Logout successful");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
        localStorage.removeItem("role");
        localStorage.removeItem("usernameId");

        Swal.fire({
          icon: "success",
          title: "Logout Succeeded!",
          text: "You have successfully logged out.",
        }).then(() => {
          navigate("/");
        });
      } else {
        // Handle unsuccessful logout
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="bg-slate-300 flex items-center justify-between p-5 shadow-md">
      <div className="flex gap-5 ml-5 items-center">
        <Link to="/" className="flex items-center gap-3 mr-10">
          <ImBooks className="text-5xl text-blue-800" />
          <p className="text-xl font-bold">BookBreeze</p>
        </Link>
        <Link to="/" className="relative group">
          <span>Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/myBooks" className=" relative group">
          <span> My Books</span>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-400 transition-all group-hover:w-full"></span>
        </Link>
        {localStorageRole === "admin" && cookie && (
          <Link to="/tableBooks" className=" relative group">
            <span> Edit Books</span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
        )}
      </div>

      {cookie ? (
        <Link
          to="/myAccount"
          className=" relative group mr-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span> My Account</span>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-400 transition-all group-hover:w-full"></span>
          {isHovered && (
            <p
              className="absolute bg-blue-800 px-4 py-1 text-white rounded-b-md"
              onClick={handleLogout}
            >
              Logout
            </p>
          )}
        </Link>
      ) : (
        <Link to="/login" className=" relative group mr-5">
          <span> Login</span>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-400 transition-all group-hover:w-full"></span>
        </Link>
      )}
    </div>
  );
}

export default NavBar;
