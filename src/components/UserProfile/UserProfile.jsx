import React from "react";
import "./UserProfile.css";
import { Avatar } from "@mui/material";
import bg from "../../assets/bg1.jpg";
// Icons
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const UserProfile = () => {
  return (
    <section className="user-profile">
      <div className="profile-card">
        <img src={bg} alt="" />
        <Avatar src="" className="profile-avatar">
          A
        </Avatar>
        <div className="profile-info">
          <div className="profile-left">
            <div className="profile-name">
              <h4>Abhay Sharma</h4>
              <GppGoodOutlinedIcon className="verified" />
              <p>( He/Him) </p>
            </div>
            <h5 className="profile-bio">
              Junior @IIT Roorkee | MERN Stack | Hello WOrld | MERN STACK
            </h5>
            <h5 className="location">
              New Delhi, Delhi, India <span> - Contact info</span>
            </h5>
            <button>Open to</button>
          </div>
          <div className="profile-right">
            <h4>Indian Institute of Technology, IIT Roorkee</h4>
            <h4>Himalayan Explorer Club, IIT Roorkee</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
