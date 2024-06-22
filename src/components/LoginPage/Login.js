import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/LinkedIn_Logo.svg.png";
import { useDispatch } from "react-redux";
// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { login } from "../../features/userSlice";
import Alert from "../Alert/Alert";

function Login() {
  const [register, setRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  //Alert Dialog Box States
  const [alertText, setAlertText] = useState("");

  //Show alert function
  const showAlert = (text) => {
    setAlertText(text);
    const alertBox = document.querySelector(".alert-box");
    alertBox.classList.add("show");
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 3000);
  };

  // Register User
  const registerApp = (e) => {
    e.preventDefault();

    if (!fullName) {
      showAlert("Please Enter Your Name");
    } else if (!email || !password) {
      showAlert("Email and password fields cannot be empty");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          updateProfile(userAuth.user, {
            displayName: fullName,
            photoURL: profilePic,
          });
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
            showAlert("Please Enter a Valid Email");
          } else if (
            error ==
            "FirebaseError: Firebase: Error (auth/email-already-in-use)."
          ) {
            showAlert("A user with this Email already exists");
          } else showAlert("Something Went Wrong!");
        });
    }
  };

  // Login User
  const loginApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoURL: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => {
        if (
          error ==
          "FirebaseError: Firebase: Error (auth/invalid-login-credentials)."
        )
          showAlert("Invalid Login Credentials");
        else if (
          error == "FirebaseError: Firebase: Error (auth/invalid-email)."
        )
          showAlert("Please enter a valid Email");
        else showAlert("Something Went Wrong!");
      });
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
        <button type="submit" onClick={register ? registerApp : loginApp}>
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
