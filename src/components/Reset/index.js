import axios from "axios";
import React from "react";
import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
import Swal from "sweetalert2";

const Reset = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassForm, setNewPassForm] = useState(false);
  // const [resetPass, setResetPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");

  const [email, setEmail] = useState("");

  const validate = (e, value) => {
    console.log("NOT  HERE VALIDATE");
    e.preventDefault();

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

  // const resetEmail = async (e) => {
  //   // setResetPass(true);
  //   console.log("FIRST HERE");
  //   e.preventDefault();
  //   let result = await axios.post(
  //     `${process.env.REACT_APP_BASE_URL}/resetEmailCode/${e.target[0].value}`
  //   );
  //   console.log("SEC HERE");
  // };

  const resetEmail = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resetEmailCode/${e.target[0].value}`
      );
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

  const invalPass = () => {
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
        <div>
          <form
            onSubmit={
              errorMessage === "Is Strong Password"
                ? resetPass
                : (e) => invalPass(e)
            }
          >
            <input type="text" placeholder="Code" className="inputLogin" />
            <input
              type="password"
              placeholder="New password"
              className="inputLogin"
              onChange={(e) => validate(e, e.target.value)}
            />
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errorMessage}
            </span>
            <input
              type="password"
              placeholder="Confirm new password"
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
      ) : (
        <div>
          {" "}
          <form onSubmit={resetEmail}>
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

      {/* {resetPass ? (
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
        
      )} */}
    </div>
  );
};

export default Reset;

// const newPass = async () => {
//   if (password === password2) {
//     // eslint-disable-next-line
//     let res = await axios.put(
//       `${process.env.REACT_APP_BASE_URL}/reset/${email}`,
//       {
//         password: password,
//       }
//     );
//     navigate("/");
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Invalid password",
//     });
//   }
// };

// const invalPass = () => {
//   Swal.fire({
//     title: "Invalid password",
//     showClass: {
//       popup: "animate__animated animate__fadeInDown",
//     },
//     hideClass: {
//       popup: "animate__animated animate__fadeOutUp",
//     },
//   });
// };

// ***************************************************

// if (result) {
//   console.log("HERE");
// } else {
//   console.log("wrong email");
// }
// let res = await axios.get(
//   `${process.env.REACT_APP_BASE_URL}/userEmail/${e.target[0].value}`
// );
