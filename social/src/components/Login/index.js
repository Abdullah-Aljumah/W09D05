import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import { useSelector } from "react-redux";
import Home from "../Home";
import "./style.css";
const Login = () => {
  const state = useSelector((state) => {
    return state;
  });
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
      {state.signIn.token ? (
        <Home />
      ) : (
        <div className="divLogin">
          <div className="wrapperLogin">
            <h1>Login</h1>
            <div className="btnsLogin">
              <form onSubmit={logIn} className="btnsForm">
                <input
                  className="inputLogin"
                  type="text"
                  name="email"
                  placeholder="Email or Username"
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
                <input
                  className="inputLogin"
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  className="inputLogin"
                  id="loginSubmit"
                  type="submit"
                  value="Login"
                />
              </form>
            </div>
            <p onClick={reg} style={{ cursor: "pointer" }}>
              Not have an account ?
            </p>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
