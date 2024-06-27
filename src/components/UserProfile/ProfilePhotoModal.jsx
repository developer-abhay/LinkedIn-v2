import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const ProfilePhotoModal = ({
  isModalOpen,
  setIsModalOpen,
  email,
  uid,
  displayName,
}) => {
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    updateProfile(auth.currentUser, {
      photoURL: newPhotoURL,
    })
      .then(() => {
        dispatch(
          login({
            email: email,
            uid: uid,
            displayName: displayName,
            photoURL: newPhotoURL,
          })
        );
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Profile Picture Url "
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{ backgroundColor: "#0A66C2", borderRadius: "30px" }}
            type="primary"
            onClick={handleOk}
          >
            <p>Update</p>
          </Button>,
        ]}
      >
        <Input
          value={newPhotoURL}
          onChange={(e) => setNewPhotoURL(e.target.value)}
          placeholder="Enter New Photo Url"
        />
      </Modal>
    </>
  );
};
export default ProfilePhotoModal;
