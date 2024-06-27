import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import AUDIO from "./assets/Recording (17).m4a";
//Components
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/LoginPage/Login";
import Widgets from "./components/Widgets/Widgets";
//Firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { firebaseApp } from "./firebase";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser?.accessToken) {
          //user is logged in
          dispatch(
            login({
              email: currentUser.email,
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            })
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Header />
          <div className="app-body">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {" "}
                    <Sidebar />
                    <Feed />
                    <Widgets />
                  </>
                }
              />
              <Route
                path="/userprofile"
                element={
                  <>
                    <UserProfile />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
