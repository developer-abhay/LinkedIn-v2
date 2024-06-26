import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Avatar } from "@mui/material";
import bg from "../../assets/bg1.jpg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
// Icons
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Post from "../Post/Post";
import UserInfoModal from "./UserInfoModal";

const UserProfile = () => {
  const { displayName, photoURL, email } = useSelector(selectUser);
  const [userPosts, setUserPosts] = useState([]);

  const getPosts = async () => {
    try {
      const allPosts = await getDocs(collection(firestore, "posts"));
      const userPostsArray = [];

      allPosts.forEach((doc) => {
        if (doc.data()["description"] == email) {
          userPostsArray.push(doc.data());
        }
      });

      setUserPosts(userPostsArray);
    } catch (err) {
      console.log(err);
    }
  };

  //User Info Modal
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="user-profile">
      <UserInfoModal open={open} setOpen={setOpen} />
      <div className="profile-card">
        <img src={bg} alt="" />
        <Avatar src={photoURL ? photoURL : ""} className="profile-avatar">
          A
        </Avatar>
        <div className="edit-icon" onClick={showModal}>
          <EditOutlinedIcon className="icon" />
        </div>
        <div className="profile-info">
          <div className="profile-left">
            <div className="profile-name">
              <h4>{displayName}</h4>
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
      {/* Posts */}
      <div className="user-posts">
        {userPosts.map(
          ({ id, message, likeStats, commentStats, timestamp }) => (
            <Post
              key={id}
              name={displayName}
              description={email}
              message={message}
              photoUrl={photoURL}
              likeStats={likeStats}
              commentStats={commentStats}
              timestamp={timestamp}
            />
          )
        )}
      </div>
    </section>
  );
};

export default UserProfile;
