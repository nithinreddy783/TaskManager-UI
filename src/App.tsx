import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import Navbar from "./components/Navbar";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<CreateTask />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
