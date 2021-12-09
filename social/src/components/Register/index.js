import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
      navigate("/");
    }
  };

  const login = () => {
    navigate("/");
  };
  return (
    <div>
      <h1> Register </h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="submit"
        value="Register"
        className="btn btn-primary"
        onClick={register}
      />
      <p onClick={login}>Already have an account?</p>
    </div>
  );
};

export default Register;