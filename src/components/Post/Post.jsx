import React, { forwardRef, useState } from "react";
import { Button, Popover, Space } from "antd";
import "./Post.css";
import { doc, deleteDoc } from "firebase/firestore";
//MUI
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//Component
import CommentSection from "../Comments/CommentSection";
import LikeFnc from "../Likes/LikeFnc";
import InputOption from "../Feed/InputOption";
import { firestore, storage } from "../../firebase";
import { deleteObject } from "firebase/storage";

const Post = forwardRef(
  (
    {
      id,
      name,
      description,
      message,
      photoUrl,
      likeStats,
      commentStats,
      timestamp,
      email,
      postImageURL,
    },
    ref
  ) => {
    //Time stamp conversion
    let time = "";
    const timeConvert = () => {
      try {
        const current = new Date().getTime();
        const postTime = new Date(timestamp?.seconds * 1000).getTime();
        const diff = (current - postTime) / 1000;

        if (diff < 60) {
          time = `${parseInt(diff)}s`;
        } else if (diff / 60 < 60) {
          time = `${parseInt(diff / 60)}mins`;
        } else if (diff / 60 / 60 < 24) {
          time = `${parseInt(diff / 60 / 60)}hrs`;
        } else if (diff / 60 / 60 / 24 < 7) {
          time = `${parseInt(diff / 60 / 60 / 24)}d`;
        } else {
          time = `${parseInt(diff / 60 / 60 / 24 / 7)}w`;
        }
      } catch (err) {
        console.log(err);
      }
    };

    timeConvert();

    const [comments, setComments] = useState([]);

    //Show Comments
    const showComments = (e) => {
      const commentSection =
        e.currentTarget.parentNode.parentNode.childNodes[4];
      commentSection.classList.toggle("show-comments");
    };

    // COntent and functions for post options
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    // Delete Post FUnction
    // const imageRef = ref(storage, `postImages/goku.jpeg`);
    const deletePost = async () => {
      try {
        await deleteDoc(doc(firestore, "posts", id));
      } catch (err) {
        console.log(err);
      }
      // deleteObject(imageRef)
      //   .then(() => {
      //     console.log("deleted");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      setOpen(false);
    };
    const content = (
      <div className="post-options">
        {description === email ? (
          <>
            <div onClick={deletePost}>
              <DeleteIcon />
              Delete This Post
            </div>
            <div>
              <EditOutlinedIcon />
              Edit Post
            </div>
          </>
        ) : (
          ""
        )}
        <div>
          <BookmarkBorderOutlinedIcon />
          Save This Post
        </div>
        <div>
          <VisibilityOffOutlinedIcon />
          Not Interested
        </div>
        <div>
          <CancelOutlinedIcon />
          Unfollow
        </div>
      </div>
    );

    return (
      <div ref={ref} className="post">
        <div className="post-header">
          <div>
            <Avatar src={photoUrl}>{name ? name[0] : "A"}</Avatar>

            <div className="post-info">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <Space wrap className="post-info-icon">
            <Popover
              open={open}
              onOpenChange={handleOpenChange}
              content={content}
              arrow={false}
              trigger="click"
              placement="bottomRight"
            >
              <MoreHorizIcon />
            </Popover>
          </Space>
        </div>

        <div className="post-body">
          <p className="message">{message}</p>
          {postImageURL && <img src={postImageURL} alt="post-image" />}
        </div>

        <div className="info-bar">
          <div className="count">
            <div className="like-count">
              <span>{likeStats["Count"]}</span> likes
            </div>
            <div className="comment-count">
              <span>{commentStats["Count"]}</span> comments
            </div>
          </div>
          <div className="date">{time}</div>
        </div>

        <div className="post-buttons">
          <LikeFnc likeStats={likeStats} postID={id} />
          <InputOption
            Icon={CommentIcon}
            feature={showComments}
            title="Comment"
            color="gray"
          />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendIcon} title="Send" color="gray" />
        </div>
        <CommentSection
          comments={comments}
          setComments={setComments}
          commentStats={commentStats}
          postID={id}
        />
      </div>
    );
  }
);

export default Post;
