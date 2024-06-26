import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "./UserInfoModal.css";

const UserInfoModal = ({ open, setOpen }) => {
  //   const [loading, setLoading] = useState(false);

  const handleOk = () => {
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
            <Input placeholder="Enter your name" value={"Abhay Sharma"} />
          </Form.Item>

          <Form.Item label="Description" required>
            <Input
              placeholder="Enter a catchy description"
              value="Junior @IIT Roorkee | MERN Stack | Hello WOrld | MERN STACK"
            />
          </Form.Item>
          <Form.Item label="City" required>
            <Input placeholder="Where do you Live?" value="" />
          </Form.Item>
          <Form.Item label="Country" required>
            <Input placeholder="Where do you Live?" value="" />
          </Form.Item>

          <Form.Item
            label="About"
            name="TextArea"
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
            />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="DatePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker className="date-input" />
          </Form.Item>
          <Form.Item label="Gender" required>
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="Rather not say">
                Rather not say
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Education" required>
            <Input placeholder="Your school/Institue name" value="" />
          </Form.Item>
          <Form.Item label="Company" required>
            <Input placeholder="Where do you work?" value="" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfoModal;
