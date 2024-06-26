import { login } from "../features/userSlice";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Login USer Function
export const loginApp = (e, email, password, dispatch, showAlert) => {
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
      else if (error == "FirebaseError: Firebase: Error (auth/invalid-email).")
        showAlert("Please enter a valid Email");
      else showAlert("Something Went Wrong!");
    });
};

// Register User Function
export const registerApp = (
  e,
  email,
  password,
  fullName,
  profilePic,
  showAlert
) => {
  e.preventDefault();
  const userRef = collection(firestore, "users");
  let userID = "";

  if (!fullName) {
    showAlert("Please Enter Your Name");
  } else if (!email || !password) {
    showAlert("Email and password fields cannot be empty");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        userID = userAuth.user.uid;
        return updateProfile(userAuth.user, {
          displayName: fullName,
          photoURL: profilePic,
        });
      })
      .then(() => {
        return setDoc(doc(userRef, userID), {
          name: fullName,
          email: email,
        });
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
          showAlert("Please Enter a Valid Email");
        } else if (
          error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ) {
          showAlert("A user with this Email already exists");
        } else showAlert("Something Went Wrong!");
      });
  }
};
