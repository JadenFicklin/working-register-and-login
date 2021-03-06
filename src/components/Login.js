import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const [firstname, setFirstname] = useState("");
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     axios({
  //       method: "POST",
  //       url: "http://localhost:5000/api/login",
  //       data: {
  //         username: username,
  //         password: password,
  //       },
  //     })
  //       .then((res) => setFirstname(res.data))
  //       .catch((err) => console.log(err + "this is the error login"));
  //   };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/login",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => setIsLoggedIn(res.data))
      .catch((err) => console.log(err + "this is the error"));
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {/* <h2>welcome {firstname}</h2> */}
      {isLoggedIn ? <h2>Welcome!</h2> : <h2>Incorrect Information</h2>}
    </>
  );
}

export default Login;
