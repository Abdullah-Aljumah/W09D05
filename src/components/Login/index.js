import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import { useSelector } from "react-redux";
import Home from "../Home";
import "./style.css";
const popupTools = require("popup-tools");

// import Swal from "sweetalert2";

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

    if (res.data.result.activate === false) {
      return navigate("/Confirm");
    } else {
      const data = {
        user: res.data.result,
        token: res.data.token,
      };
      dispatch(login_reducser({ data }));
    }
  };

  const reg = () => {
    navigate("/register");
  };

  const reset = () => {
    navigate("/reset");
  };

  const oAuth = () => {
    popupTools.popup(
      `${process.env.REACT_APP_BASE_URL}/auth/google`,
      "Logging in with Google",
      { width: 500, height: 500 },
      (err, user) => {
        if (err) {
          console.log("caughton error:", err.message);
        } else {
          console.log(user.result);
          console.log(user.token);
          const data = { token: user.token, user: user.result };
          dispatch(login_reducser({ data }));
          navigate("/");
        }
      }
    );
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
            <button className="inputLogin" id="loginSubmit" onClick={oAuth}>
              Google+
            </button>
            <p onClick={reg} style={{ cursor: "pointer" }}>
              Not have an account ?
            </p>{" "}
            <p onClick={reset}>Forgot the password ?</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
