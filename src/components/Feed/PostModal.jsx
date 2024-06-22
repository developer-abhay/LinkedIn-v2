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
import { ref } from "firebase/storage";
import { storage } from "../../firebase";

const PostModal = ({ open, setOpen, publishPost, input, setInput }) => {
  const [postBtnDisabled, setPostBtnDisabled] = useState(true);

  useEffect(() => {
    setPostBtnDisabled(input.length === 0);
  }, [input]);

  //Upload Image to firebase storage
  const [file, setFile] = useState(null);
  const fileRef = ref(storage, file);
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
        <div className="post-options">
          <input type="file" onChange={(e) => setFile(e.target.files)} />
          <InputOption Icon={PhotoIcon} color="gray" />
          <InputOption Icon={SmartDisplayIcon} color="gray" />
          <InputOption Icon={EventIcon} color="gray" />
          <InputOption Icon={NewspaperIcon} color="gray" />
        </div>
      </Modal>
    </>
  );
};
export default PostModal;