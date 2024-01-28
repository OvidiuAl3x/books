import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5555/users", {
        username: username,
        password: password,
      });

      if (response.status === 201) {
        console.log("Registration successful", response.data);
        // Redirect or handle successful registration here
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been successfully created",
        }).then(() => {
          navigate(-1);
        });
      } else {
        console.error("Registration failed");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        // Handle failed registration (show error message, etc.)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error during registration", error);
    }
  };

  const handleUsernameCreate = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordCreate = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="h-[80vh] flex justify-center">
      <div className="flex flex-col items-center  bg-slate-300  m-auto rounded-lg shadow-lg w-[400px] h-[500px]">
        <p className=" text-3xl mt-10">Member Register</p>

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
              onChange={handleUsernameCreate}
            />
          </div>

          <div className="flex items-center bg-white  ">
            <div className="bg-blue-800 text-white h-full flex items-center justify-center px-2">
              <FaLock className="text-xl" />
            </div>
            <input
              type="password"
              className="text-base py-2 rounded-md px-1 outline-none w-[270px]"
              placeholder="Password"
              value={password}
              onChange={handlePasswordCreate}
            />
          </div>

          <button
            type="button"
            className="bg-blue-800 text-white mt-5 rounded-lg py-2 hover:-translate-y-1 duration-300 w-[250px] mx-auto mb-5"
            onClick={handleLogin}
          >
            Register
          </button>

          <hr className="bg-white h-[2px] w-full" />

          <Link
            to="/login"
            className="bg-white text-blue-800 mt-5 rounded-lg py-2 hover:-translate-y-1 duration-300 w-[250px] mx-auto text-center "
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
