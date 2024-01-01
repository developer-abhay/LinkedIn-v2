import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";
import "./Feed.css";
//Mui Icons
import CreateIcon from "@mui/icons-material/Create";
import PhotoIcon from "@mui/icons-material/Photo";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InputOption from "./InputOption";
//Components
import Post from "../Post/Post";
//Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firestore } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

function Feed() {
  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const dbRef = collection(firestore, "posts");

  useEffect(() => {
    onSnapshot(query(dbRef, orderBy("timestamp", "desc")), (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const publishPost = (e) => {
    e.preventDefault();

    setDoc(doc(dbRef), {
      name: user.displayName,
      photoUrl: user.photoURL || "",
      description: user.email,
      message: input,
      likeStats: { liked: false, Count: 257 },
      commentStats: { Count: 0, comments: [] },
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed-input-container">
        <div className="feed-input">
          <CreateIcon className="feed-icon" />
          <form>
            <input
              type="text"
              placeholder="Start a post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" onClick={(e) => publishPost(e)}>
              Send
            </button>
          </form>
        </div>
        <div className="feed-options">
          <InputOption title="Photo" Icon={PhotoIcon} color="#6e96cb" />
          <InputOption title="Video" Icon={SmartDisplayIcon} color="#d6de67" />
          <InputOption title="Event" Icon={EventIcon} color="#c8a4de" />
          <InputOption
            title="Write Article"
            Icon={NewspaperIcon}
            color="#e37f7f"
          />
        </div>
      </div>

      <FlipMove>
        {posts.map(
          ({
            id,
            data: {
              name,
              description,
              photoUrl,
              message,
              likeStats,
              commentStats,
              timestamp,
            },
          }) => {
            return (
              <Post
                key={id}
                id={id}
                name={name}
                description={description}
                photoUrl={photoUrl}
                message={message}
                likeStats={likeStats}
                commentStats={commentStats}
                timestamp={timestamp}
              />
            );
          }
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
