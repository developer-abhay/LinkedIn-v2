import React from "react";
import "./HeaderOption.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function HeaderOption({ avatar, Icon, title, showLogout }) {
  const user = useSelector(selectUser);

  return (
    <div className="header-option" onClick={showLogout}>
      {Icon && <Icon className="header-option-icon" />}
      {avatar && (
        <Avatar src={user?.photoURL} className="header-option-icon">
          {user.displayName ? user.displayName[0] : "A"}
        </Avatar>
      )}
      <h3 className="header-option-title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
