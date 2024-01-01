import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import { useEffect } from "react";
import "./App.css";
//
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

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (userA) => {
        if (userA?.accessToken) {
          //user is logged in
          dispatch(
            login({
              email: userA.email,
              uid: userA.uid,
              displayName: userA.displayName,
              photoURL: userA.photoURL,
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
        <>
          <Header />
          <div className="app-body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
