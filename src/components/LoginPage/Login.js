import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/LinkedIn_Logo.svg.png";

import Alert from "../Alert/Alert";

import { loginApp, registerApp } from "../../app/firebaseAPI";
import { useDispatch } from "react-redux";

function Login() {
  const [register, setRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const dispatch = useDispatch();

  //Alert Dialog Box State and function
  const [alertText, setAlertText] = useState("");

  const showAlert = (text) => {
    setAlertText(text);
    const alertBox = document.querySelector(".alert-box");
    alertBox.classList.add("show");
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 3000);
  };

  return (
    <div className="login">
      <Alert alertText={alertText} />
      <img src={Logo} alt="" />

      <form action="">
        {register ? (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              value={profilePic}
              type="text"
              placeholder="Profile Pic URL(optional)"
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </>
        ) : (
          ""
        )}

        <input
          type="email"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={
            register
              ? (e) => {
                  registerApp(
                    e,
                    email,
                    password,
                    fullName,
                    profilePic,
                    showAlert
                  );
                }
              : (e) => loginApp(e, email, password, dispatch, showAlert)
          }
        >
          {register ? "Register" : "Sign In"}
        </button>
      </form>
      {register ? (
        <p>
          Already a member ?
          <span href="" onClick={() => setRegister(false)}>
            {" "}
            SignIn
          </span>
        </p>
      ) : (
        <p>
          Not a member ?
          <span href="" onClick={() => setRegister(true)}>
            {" "}
            Register Now
          </span>
        </p>
      )}
    </div>
  );
}

export default Login;
