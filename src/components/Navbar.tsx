import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Task List</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/create">Create Task</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
