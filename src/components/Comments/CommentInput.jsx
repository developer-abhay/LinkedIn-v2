import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
//Firebase
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const CommentInput = ({ commentStats, postID, setComments }) => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const dbRef = collection(firestore, "posts");

  setComments(commentStats.comments);

  //Publish Comment
  const publishComment = (e) => {
    e.preventDefault();

    updateDoc(doc(dbRef, postID), {
      commentStats: {
        Count: commentStats.Count + 1,
        comments: [
          ...commentStats.comments,
          {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoURL || " ",
            timestamp: new Date(),
          },
        ],
      },
    });

    setInput("");
  };

  return (
    <div className="comment-bar">
      <Avatar src={user.photoURL} className="comment-avatar">
        {user.displayName ? user.displayName[0] : "A"}
      </Avatar>

      <form className="comment-input">
        <input
          type="test"
          placeholder="Add a Comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={(e) => publishComment(e)}></button>
      </form>
    </div>
  );
};

export default CommentInput;
