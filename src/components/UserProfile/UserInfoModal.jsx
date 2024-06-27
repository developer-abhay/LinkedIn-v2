import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "./UserInfoModal.css";
//firebase
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const UserInfoModal = ({ open, setOpen, uid }) => {
  //   const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({});

  const userRef = doc(firestore, "users", uid);

  useEffect(() => {
    try {
      getDoc(userRef).then((data) => {
        const userDoc = data.data();
        setUserData(userDoc);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleOk = async () => {
    updateDoc(userRef, { ...userData });

    // setLoading(true);
    setTimeout(() => {
      //   setLoading(false);
      setOpen(false);
    }, 100);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //   Form
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        className="user-info-modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
            style={{ backgroundColor: "#0a66c2", borderRadius: "20px" }}
          >
            <p>Update</p>
          </Button>,
        ]}
      >
        <h3> Edit Intro</h3>
        <p>* Indicates required</p>
        <br />
        <Form form={form} layout="vertical" className="user-info-form">
          <Form.Item label="Full Name" required>
            <Input
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Description" required>
            <Input
              placeholder="Enter a catchy description"
              value={userData.description}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="City" required>
            <Input
              placeholder="Where do you Live?"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Country" required>
            <Input
              placeholder="What is your nationality?"
              value={userData.country}
              onChange={(e) =>
                setUserData({ ...userData, country: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="About"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="A brief bio about yourself"
              style={{ resize: "none" }}
              value={userData.about}
              onChange={(e) =>
                setUserData({ ...userData, about: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Gender" required>
            <Select
              value={userData.gender}
              onChange={(value) => setUserData({ ...userData, gender: value })}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="Rather not say">
                Rather not say
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Education" required>
            <Input
              placeholder="Your school/Institue name"
              value={userData.education}
              onChange={(e) =>
                setUserData({ ...userData, education: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Company" required>
            <Input
              placeholder="Where do you work?"
              value={userData.company}
              onChange={(e) =>
                setUserData({ ...userData, company: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfoModal;
