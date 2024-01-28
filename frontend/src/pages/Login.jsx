import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful", response.data.user);

        // Store username and role in local storage
        const { _id, role } = response.data.user;

        localStorage.setItem("usernameId", _id);
        localStorage.setItem("role", role);

        // Log all cookies
        // Retrieve the "token" cookie
        const tokenCookie = document.cookie
          .split("; ")
          .find((cookie) => cookie.startsWith("token="));

        // Extract the value of the "token" cookie
        const token = tokenCookie ? tokenCookie.split("=")[1] : null;

        Swal.fire({
          icon: "success",
          title: "Login Succsesfully!",
          text: "You have successfully logged in",
        }).then(() => {
          navigate("/");
          navigate(0);
        });
      } else {
        console.error("Login failed");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        // Handle failed login (show error message, etc.)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error during login", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="h-[80vh] flex justify-center">
      <div className="flex flex-col items-center  bg-slate-300  m-auto rounded-lg shadow-lg w-[400px] h-[500px]">
        <p className=" text-3xl mt-10">Member Login</p>

        <div className="flex flex-col gap-2 justify-center items-center m-auto">
          <div className="flex items-center bg-white ">
            <div className="bg-blue-800 text-white h-full flex items-center justify-center px-2">
              <FaUser className="text-xl" />
            </div>

            <input
              type="text"
              className="text-base py-2 rounded-md px-1 outline-none w-[270px]"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="flex items-center bg-white">
            <div className="bg-blue-800 text-white h-full flex items-center justify-center px-2">
              <FaLock className="text-xl" />
            </div>

            <input
              type="password"
              autoComplete="off"
              className="text-base py-2 rounded-md px-1 outline-none w-[270px]"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            type="button"
            className="bg-blue-800 text-white mt-5 rounded-lg py-2 hover:-translate-y-1 duration-300 w-[250px] mx-auto"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center text-sm mb-4 mt-2">
            Forgot Password? <Link className="underline">Click Here!</Link>
          </p>
          <hr className="bg-white h-[2px] w-full" />

          <Link
            to="/register"
            className="bg-white text-blue-800 mt-5 rounded-lg py-2 hover:-translate-y-1 duration-300 w-[250px] mx-auto text-center"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
