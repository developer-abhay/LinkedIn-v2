import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FlipMove from "react-flip-move";
//Comments
import CommentInput from "./CommentInput";
import "./CommentSection.css";
import Comment from "./Comment";

const CommentSection = ({ commentStats, postID, comments, setComments }) => {
  return (
    <div className="comment-section">
      <CommentInput
        commentStats={commentStats}
        postID={postID}
        comments={comments}
        setComments={setComments}
      />

      <div className="most-relevant">
        Most Relevant
        <ArrowDropDownIcon />
      </div>
      <FlipMove>
        <div className="comment-container">
          {comments.length
            ? comments.map(
                (
                  { name, description, message, photoUrl, timestamp },
                  index
                ) => (
                  <Comment
                    key={index}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                    timestamp={timestamp}
                  />
                )
              )
            : ""}
        </div>
      </FlipMove>
    </div>
  );
};

export default CommentSection;
