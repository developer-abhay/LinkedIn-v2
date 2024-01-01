import React from "react";
import { Avatar } from "@mui/material";
import FlipMove from "react-flip-move";

const Comment = ({ name, photoUrl, description, message, timeStamp }) => {
  return (
    <FlipMove>
      <div className="comment">
        <Avatar src={photoUrl} className="comment-avatar">
          {name ? name[0] : "A"}
        </Avatar>
        <div>
          <div className="comment-info">
            <h5>{name}</h5>
            <p className="user-info">{description}</p>
            <p>{message}</p>
          </div>

          <div className="comment-like">
            <p>Like</p>
            <p>Reply</p>
          </div>
        </div>
      </div>
    </FlipMove>
  );
};

export default Comment;
