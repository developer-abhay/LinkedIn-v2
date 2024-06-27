import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import "./PostModal.css";
import InputOption from "./InputOption";
// MUI Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PhotoIcon from "@mui/icons-material/Photo";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const PostModal = ({ open, setOpen, publishPost, input, setInput }) => {
  const [postBtnDisabled, setPostBtnDisabled] = useState(true);

  useEffect(() => {
    setPostBtnDisabled(input.length === 0);
  }, [input]);

  return (
    <>
      <Modal
        className="post-modal"
        title="Create a Post"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button
            className="post-modal-btn"
            key="submit"
            type="primary"
            onClick={(e) => {
              setOpen(false);
              setInput("");
              publishPost(e);
            }}
            disabled={postBtnDisabled}
          >
            <p> Post</p>
          </Button>,
        ]}
      >
        <div className="post-user-profile">
          <Avatar src={""} className="avatar">
            A
          </Avatar>
          <div>
            <div>
              <h2>Abhay Sharma</h2>
              <ArrowDropDownIcon />
            </div>
            <p>Post to anyone</p>
          </div>
        </div>
        <textarea
          className="post-text-area"
          type="text"
          placeholder="What do you want to talk about?"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
        {/* {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )} */}
        {/* {imgUrl && (
          <div className="post-image">
            <img src={imgUrl} alt="uploaded file" height={200} />
          </div>
        )} */}
        <div className="post-options">
          <label htmlFor="post-image-upload">
            <InputOption Icon={PhotoIcon} color="#1677FF" />
          </label>
          <input
            id="post-image-upload"
            type="file"
            // onChange={(e) => {
            //   uploadPostImage(e.target.files[0]);
            // }}
            hidden
          />
          <InputOption Icon={SmartDisplayIcon} color="gray" />
          <InputOption Icon={EventIcon} color="gray" />
          <InputOption Icon={NewspaperIcon} color="gray" />
        </div>
      </Modal>
    </>
  );
};
export default PostModal;
