import { useState } from "react";

import img from "../photo/IMG-Form.jpg";

export const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("username", JSON.stringify(res["username"]));
        window.location.href = "/mybooks";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-formLogin">
      <img src={img} alt={img} />

      <div className="login">
        <p className="sign-up">
          Not a member? <span>Register now</span>
        </p>

        <h1>Hello Again!</h1>
        <h5>Welcome back you've been missed!</h5>
        <form>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>

        <div
          style={{ display: "flex", alignItems: "center", margin: "15px 0px" }}
        >
          <hr style={{ width: "60px", height: "0px" }} />
          <span style={{ fontSize: "14px", margin: "0px 10px" }}>
            Or continue with
          </span>
          <hr style={{ width: "60px", height: "0px" }} />
        </div>

        <div className="login-options">
          <i class="fa-brands fa-google"></i>
          <i class="fa-brands fa-apple"></i>
          <i class="fa-brands fa-facebook"></i>
        </div>
      </div>
    </div>
  );
};
