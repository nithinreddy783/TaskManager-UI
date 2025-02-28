import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api";

const CreateTask: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; owner: string; command: string }) => {
    setLoading(true);
    try {
      const newTask = {
        id: Date.now().toString(),  // ✅ Generate a unique ID
        ...values
      };

      await createTask(newTask);
      message.success("Task created successfully");
      navigate("/"); // ✅ Redirect to Task List
    } catch (error) {
      message.error("Failed to create task");
    }
    setLoading(false);
  };

  return (
    <Card title="Create Task" style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Task Name" name="name" rules={[{ required: true, message: "Please enter task name" }]}>
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item label="Owner" name="owner" rules={[{ required: true, message: "Please enter owner name" }]}>
          <Input placeholder="Enter owner name" />
        </Form.Item>
        <Form.Item label="Command" name="command" rules={[{ required: true, message: "Please enter command" }]}>
          <Input placeholder="Enter shell command" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Task
        </Button>
      </Form>
    </Card>
  );
};

export default CreateTask;
