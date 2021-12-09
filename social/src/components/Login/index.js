import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import { useSelector } from "react-redux";
const Login = () => {

  const state = useSelector((state) => {
    return state;
  });
  console.log(state,"STATE");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      data: emailOrUsername,
      password: password,
    });
    console.log(res.data.token, "RES");
    const data = {
      user: res.data.result,
      token: res.data.token,
    };
    dispatch(login_reducser({ data }));
  };

  const reg = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={logIn}>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
      <p onClick={reg}>Not have an account ?</p>{" "}
    </div>
  );
};

export default Login;
