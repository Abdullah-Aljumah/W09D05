import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style.css";

const Reset = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassForm, setNewPassForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const validate = (e, value) => {
    e.preventDefault();
    console.log(e, "VALIDATE");
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

  const resetEmail = async (e) => {
    e.preventDefault();
    let check = false;
    // eslint-disable-next-line
    users.map((item) => {
      if (item.email === e.target[0].value) {
        check = true;
      }
    });
    if (check) {
      Swal.fire({
        icon: "success",
        // title: "Oops...",
        text: "Please wait",
      });
      try {
        let result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/resetEmailCode/${e.target[0].value}`
        );
        console.log(result, "RESULT");
        if (result) {
          let res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/userEmail/${e.target[0].value}`
          );
          let newEmail = e.target[0].value;
          setEmail(newEmail);
          let newCode = res.data[0].resetCode;
          setNewPassForm(true);
          setCode(newCode);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email not exist",
      });
    }
  };

  const resetPass = async (e) => {
    e.preventDefault();
    if (e.target[0].value === code) {
      if (e.target[1].value === e.target[2].value) {
        // eslint-disable-next-line
        let result = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/reset/${email}`,
          {
            password: e.target[1].value,
          }
        );
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid confirm password",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid code",
      });
    }
  };

  const invalPass = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Invalid email or password",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <div>
      {newPassForm ? (
        <div className="divEmailRest">
          <form
            className="emailForm"
            onSubmit={
              errorMessage === "Is Strong Password"
                ? (e) => resetPass(e)
                : (e) => invalPass(e)
            }
          >
            <input
              type="text"
              placeholder="Code"
              className="inputLogin"
              required
            />
            <input
              type="password"
              placeholder="New password"
              className="inputLogin"
              onChange={(e) => validate(e, e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm new password"
              className="inputLogin"
              required
            />
            <span
              className="spanPass"
              style={{
                fontWeight: "bold",
                color: "red",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </span>
            <input
              type="submit"
              value="send"
              className="inputLogin"
              id="loginSubmit"
            />
          </form>{" "}
        </div>
      ) : (
        <div className="divEmailRest">
          {" "}
          <form onSubmit={resetEmail} className="emailForm">
            <input
              type="email"
              placeholder="Your email"
              className="inputLogin"
            />
            <input
              type="submit"
              value="send"
              className="inputLogin"
              id="loginSubmit"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Reset;
