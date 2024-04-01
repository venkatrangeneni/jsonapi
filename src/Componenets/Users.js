import React, { useState, useEffect } from "react";
import { Modal, Button, message, Form, Input } from "antd";
import axios from "axios";
const { ObjectId } = require("mongoose").Types;
 
const Users = () => {
  const [  users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [post, setPost] = useState(null);
  const [form] = Form.useForm();
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
 
  const getUsersList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/users/v1.0/getUsers"
      );
      setUsers(response.data.data);
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
 
  const getUserById = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/users/v1.0/getUsersById/${_id}`
      );
      setPost(response.data.data);
      setIsModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
 
  const viewUserDetails = async (_id) => {
    try {
      await getUserById(_id);
      setIsDetailsModalVisible(true);
      setIsModal(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
 
  const handleCancelDetailsModal = () => {
    setIsDetailsModalVisible(false);
  };
 
  const deleteUser = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/users/v1.0/deleteUser/${_id}`
      );
      if (response.data && response.data.data) {
        message.success("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== _id));
      } else {
        message.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user: " + error.message);
    }
  };
 
  const createUser = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/users/v1.0/createUser",
        values
      );
      console.log("post response", response);
      if (response.data.data) {
        message.success("User created successfully!");
        setUsers([...users, response.data.data]);
        setIsModal(false);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
 
  const ObjectId = require("mongoose").Types.ObjectId;
 
  const updateUser = async (_id, values) => {
    try {
      const objectId = ObjectId.isValid(_id) ? new ObjectId(_id) : null;
      if (!objectId) {
        console.error("Invalid ObjectId:", _id);
        return;
      }
 
      const response = await axios.put(
        `http://localhost:8081/api/users/v1.0/updateUser/${objectId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("update response", response);
      const updatedUser = response.data.response;
      setUsers(users.map((user) => (user?._id === _id ? updatedUser : user)));
      setIsModal(false);
      setPost(updatedUser);
      message.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
   
  };
 
  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
    setPost(null);
  };
 
  useEffect(() => {
    getUsersList();
  }, []);
 
  return (
    <React.Fragment>
      <div className="user_list">
        <h2>API USER</h2>
        <div className="btn">
        <Button type="primary"  onClick={() => { setIsModal(true); setPost(null); }}>
  Create User
</Button>
        </div>
        <table className="user_table" width={"100%"} border={1}>
          <thead>
            <tr>
              <th>_ID</th>
              <th>firstName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>age</th>
              <th>dob</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user?._id ? user?._id : "N/A"}</td>
                <td>{user?.firstName}</td>
                 
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.username}</td>
                <td>{user?.age}</td>
                <td>{user?.DOB}</td>
                <td>
                  <button style={{backgroundColor:"violet", color:"white",border:"0"}} onClick={() => getUserById(user?._id)}>edit</button>
                  <button style={{backgroundColor:"blue", color:"white",border:"0"}} onClick={() => viewUserDetails(user?._id)}>
                    view details
                  </button>
                  <button style={{backgroundColor:"red", color:"white",border:"0"}} onClick={() => deleteUser(user?._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={post ? "update" : "Create User"}
        visible={isModal}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm
          onSubmit={
           post
              ? (values) => updateUser(post._id, values)
              : createUser
          }
          initialValues={post}
          form={form}
        />
      </Modal>
      <UserDetailsModal
        visible={isDetailsModalVisible}
        user={post}
        onClose={handleCancelDetailsModal}
      />
    </React.Fragment>
  );
};
 
const UserDetailsModal = ({ visible, user, onClose }) => {
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>_id: {user ? user._id : ""}</p>
      <p>Name: {user ? user.firstName : ""}</p>
      <p>Email: {user ? user.email : ""}</p>
    </Modal>
  );
};
 
const UserForm = ({ onSubmit, initialValues, form ,handleCancel}) => {
  const onFinish = (values) => {
    onSubmit(values);
    // handleCancel();
    form.resetFields();
  };
 
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);
 
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="firstName" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="phone" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="DOB" name="DOB">
        <Input />
      </Form.Item>
      <Form.Item label="age" name="age">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};
 
export default Users;