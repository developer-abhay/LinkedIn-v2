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

function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const register = () => {
    if (!fullName) {
      alert("Enter Your Name");
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
        .catch((error) => alert(error));

      alert("You Have been registered");
    }
  };

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
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img src={Logo} alt="" />

      <form action="">
        <input
          type="text"
          placeholder="Full Name(required if registering)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          value={profilePic}
          type="text"
          placeholder="Profile Pic URL(optional)"
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={loginApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?
        <span href="" onClick={register}>
          {" "}
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
