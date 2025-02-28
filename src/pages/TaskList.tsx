import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Card } from "antd";
import { getTasks, deleteTask, Task } from "../api";
import { Link } from "react-router-dom";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      message.error("Error fetching tasks");
    }
    setLoading(false);
  };

  // 🔍 Search Function
  const handleSearch = () => {
    const filtered = tasks.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredTasks(filtered);
  };

  // ❌ Delete Task Function
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      message.success("Task deleted successfully");
      fetchTasks(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  return (
    <Card title="Task List" style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
      <Space style={{ marginBottom: 16, width: "100%" }}>
        <Input
          placeholder="Search tasks by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "70%" }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Link to="/create">
          <Button type="default">Create Task</Button>
        </Link>
      </Space>
      <Table
        dataSource={filteredTasks}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        columns={[
          { title: "Task Name", dataIndex: "name", key: "name" },
          { title: "Owner", dataIndex: "owner", key: "owner" },
          { title: "Command", dataIndex: "command", key: "command" },
          {
            title: "Actions",
            key: "actions",
            render: (task: Task) => (
              <Space>
                <Button danger onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default TaskList;
