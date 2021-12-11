import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import validator from "validator";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [role, setRole] = useState("61a734d2947e8eba47efbc6a");

  const getData = async () => {
    const items = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    // console.log(items.data);
    setUsers(items.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  const register = async () => {
    let check = false;
    // eslint-disable-next-line
    users.map((item) => {
      // eslint-disable-next-line
      if (item.email == email || item.username == userName) {
        check = true;
      }
    });
    if (check) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " email or username alerady exists",
      });
    } else {
      // eslint-disable-next-line
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resgister`,
        {
          email,
          username: userName,
          password,
        }
      );
      console.log(res.data);
      navigate("/");
    }
  };

  const login = () => {
    navigate("/");
  };

  const invalPass = () => {
    Swal.fire({
      title:
        "Please enter atleast upper and lower and number and symbol characters",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  return (
    <div className="divLogin">
      <div className="wrapperLogin">
        <h1> Register </h1>

        <div className="btnsForm">
          <input
            className="inputLogin"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            className="inputLogin"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="inputLogin"
            type="password"
            name="password"
            id="passIput"
            placeholder="Password"
            onChange={(e) => {
              validate(e.target.value);
              setPassword(e.target.value);
            }}
          />{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {errorMessage}
          </span>
          <input
            className="inputLogin"
            id="loginSubmit"
            type="submit"
            value="Register"
            onClick={
              errorMessage === "Is Strong Password" ? register : invalPass
            }
          />
        </div>
        <p onClick={login} style={{ cursor: "pointer" }}>
          Already have an account ?
        </p>
      </div>
    </div>
  );
};

export default Register;
