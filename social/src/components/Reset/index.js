import axios from "axios";
import React from "react";
import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Reset = () => {
  const navigate = useNavigate();

  const [resetPass, setResetPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [email, setEmail] = useState("");
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
  const resetEmail = async (e) => {
    setResetPass(true);
    e.preventDefault();

    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/userEmail/${e.target[0].value}`
    );

    if (res) {
      console.log("HERE");
    } else {
      console.log("wrong email");
    }
  };

  //   const resetCode = async (email) => {
  //     let result = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/resetEmailCode/${email}`
  //     );
  //     console.log("HERE");
  //   };

  const newPass = async () => {
    if (password === password2) {
        // eslint-disable-next-line
      let res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/reset/${email}`,
        {
          password: password,
        }
      );
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid password",
      });
    }
  };

  const invalPass = () => {
    Swal.fire({
      title: "Invalid password",
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
      {resetPass ? (
        <div className="btnsForm">
          <input
            className="inputLogin"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
              validate(e.target.value);
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
              setPassword2(e.target.value);
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
            value="Change"
            onClick={
              errorMessage === "Is Strong Password" ? newPass : invalPass
            }
          />
        </div>
      ) : (
        <form onSubmit={(e) => resetEmail(e)}>
          <input
            placeHolder="Your email"
            className="inputLogin"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            value="send"
            className="inputLogin"
            id="loginSubmit"
          />
        </form>
      )}
    </div>
  );
};

export default Reset;
