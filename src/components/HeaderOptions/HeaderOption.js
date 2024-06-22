import React from "react";
import "./HeaderOption.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";

function HeaderOption({ avatar, Icon, title, showLogout, link }) {
  const user = useSelector(selectUser);

  return (
    <>
      {link && (
        <Link to={link} className="header-option">
          {Icon && <Icon className="header-option-icon" />}
          {avatar && (
            <Avatar src={user?.photoURL} className="header-option-icon">
              {user.displayName ? user.displayName[0] : "A"}
            </Avatar>
          )}
          <h3 className="header-option-title">{title}</h3>
        </Link>
      )}
      {!link && (
        <div className="header-option" onClick={showLogout}>
          {Icon && <Icon className="header-option-icon" />}
          {avatar && (
            <Avatar src={user?.photoURL} className="header-option-icon">
              {user.displayName ? user.displayName[0] : "A"}
            </Avatar>
          )}
          <h3 className="header-option-title">{title}</h3>
        </div>
      )}
    </>
  );
}

export default HeaderOption;
