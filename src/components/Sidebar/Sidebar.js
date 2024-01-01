import React from "react";
import { Avatar } from "@mui/material";
import bg from "../../assets/bg1.jpg";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar-recent-item">
      <span className="sidebar-hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src={bg} alt="" />
        <Avatar src={user.photoURL} className="sidebar-avatar">
          {user.displayName ? user.displayName[0] : "A"}
        </Avatar>
        <h4>{user.displayName}</h4>
        <h5>{user.email}</h5>

        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <p>Who's viewed your profile :</p>
            <p className="sidebar-stat-number">42</p>
          </div>
          <div className="sidebar-stat">
            <p>Connections :</p>
            <p className="sidebar-stat-number">632</p>
          </div>
        </div>
      </div>

      <div className="sidebar-bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("softwareengineering")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  );
}

export default Sidebar;
