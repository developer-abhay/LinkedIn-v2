import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
//  MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeaderOption from "../HeaderOptions/HeaderOption";
// Firebase
import { auth } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //Show Logout
  const showLogout = () => {
    const logoutOption = document.querySelector(".logout-option");
    logoutOption.classList.toggle("display-none");
  };

  //Logout
  const logoutApp = () => {
    try {
      dispatch(logout());
      signOut(auth);
    } catch (err) {
      alert(err);
    }
  };

  //show Search bar
  function showSearch() {
    const html = document.documentElement;
    const headerRight = document.querySelector(".header-right");
    const headerSearchInput =
      document.querySelector(".header-search").children[1];

    // only works if the input is already hidden
    if (!(window.getComputedStyle(headerSearchInput).display === "none")) {
      return 0;
    }

    headerRight.classList.add("display-none");
    headerSearchInput.classList.add("display-block");
    html.addEventListener("click", closeMenuOnBodyClick);
  }

  // Hide Search Bar function
  function hideSearch() {
    const html = document.documentElement;
    const headerRight = document.querySelector(".header-right");
    const headerSearchInput =
      document.querySelector(".header-search").children[1];

    headerRight.classList.remove("display-none");
    headerSearchInput.classList.remove("display-block");
    html.removeEventListener("click", closeMenuOnBodyClick);
    console.log("hello");
  }

  //Close search bar on body click
  function closeMenuOnBodyClick(event) {
    // get the event path
    const path = event.composedPath();

    // check if it has the search element
    if (path.some((elem) => elem.id === "header-search")) {
      // terminate this function if it does
      return;
    }
    hideSearch();
  }

  return (
    <div className="header">
      <div className="header-left ">
        <LinkedInIcon className="logo" style={{ fontSize: "40px" }} />
        <div className="header-search" id="header-search">
          <SearchIcon onClick={showSearch} />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="header-right">
        <HeaderOption Icon={HomeIcon} title="Home" link="/" />
        <HeaderOption Icon={PeopleIcon} title="My Network" />
        <HeaderOption Icon={WorkIcon} title="Jobs" />
        <HeaderOption Icon={TextsmsIcon} title="Messages" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />

        <HeaderOption showLogout={showLogout} avatar={1} title="Me" />

        {/* Show user profile Modal */}
        <div
          className="logout-option display-none"
          id="logout-option"
          onClick={showLogout}
        >
          <Link to="/userprofile">
            <Avatar src={user.photoURL} alt="">
              {user?.displayName ? user.displayName[0] : " "}
            </Avatar>
            <div>
              <h3>{user.displayName}</h3>
              <p>Junior@IITR | Web developer | React.js</p>
            </div>
          </Link>
          <hr />
          <button onClick={logoutApp}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
