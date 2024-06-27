import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Avatar } from "@mui/material";
import bg from "../../assets/bg1.jpg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import FlipMove from "react-flip-move";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Post from "../Post/Post";
import UserInfoModal from "./UserInfoModal";
import ProfilePhotoModal from "./ProfilePhotoModal";

const UserProfile = () => {
  const { photoURL, email, uid } = useSelector(selectUser);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState({});

  const getPosts = async () => {
    try {
      const allPosts = await getDocs(collection(firestore, "posts"));
      const userPostsArray = [];

      allPosts.forEach((doc) => {
        if (doc.data()["description"] === email) {
          userPostsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setUserPosts(userPostsArray);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const userRef = doc(firestore, "users", uid);
      const response = await getDoc(userRef);
      const data = response.data();
      setUserData({ ...data });
    } catch (err) {
      console.log(err);
    }
  };

  //User Info Modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  // Profile Picture Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showPhotoModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getPosts();
    getUserData();
  }, [userPosts]);

  return (
    <section className="user-profile">
      <UserInfoModal open={open} setOpen={setOpen} uid={uid} />
      <ProfilePhotoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        email={email}
        uid={uid}
        displayName={userData.name}
      />
      <div className="profile-card">
        <img src={bg} alt="" />

        <Avatar src={photoURL ? photoURL : ""} className="profile-avatar">
          {userData.name ? userData.name[0] : ""}
        </Avatar>
        <div className="edit-photo-icon" onClick={showPhotoModal}>
          <EditOutlinedIcon className="icon" />
        </div>
        <div className="edit-icon" onClick={showModal}>
          <EditOutlinedIcon className="icon" />
        </div>
        <div className="profile-info">
          <div className="profile-left">
            <div className="profile-name">
              <h4>{userData.name}</h4>
              <GppGoodOutlinedIcon className="verified" />
              <p>
                {userData.gender === "male"
                  ? "He/Him"
                  : userData.gender === "female"
                  ? "She/Her"
                  : userData.gender
                  ? "They/Them"
                  : ""}
              </p>
            </div>
            <h5 className="profile-bio">
              {userData.description ? userData.description : ""}
            </h5>
            <h5 className="location">
              {userData.city ? userData.city : ""},
              {userData.country ? userData.country : ""}
              <span> Contact info</span>
            </h5>
            <button>Open to</button>
          </div>
          <div className="profile-right">
            <h4>
              {userData.education ? (
                <>
                  <SchoolIcon className="icon" />
                  {userData.education}
                </>
              ) : (
                ""
              )}
            </h4>
            <h4>
              {userData.company ? (
                <>
                  <WorkIcon className="icon" />
                  {userData.company}
                </>
              ) : (
                ""
              )}
            </h4>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className="user-posts">
        <h2>Posts</h2>
        <FlipMove>
          {userPosts.map(
            ({ id, message, likeStats, commentStats, timestamp }) => {
              return (
                <Post
                  key={id}
                  id={id}
                  name={userData.name}
                  description={email}
                  message={message}
                  photoUrl={photoURL}
                  likeStats={likeStats}
                  commentStats={commentStats}
                  timestamp={timestamp}
                  email={email}
                />
              );
            }
          )}
        </FlipMove>
      </div>
    </section>
  );
};

export default UserProfile;
