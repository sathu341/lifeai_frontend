import { useState,useEffect } from "react";
import { Layout, Menu, Switch, Card } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "../App.css";

const { Header, Sider, Content } = Layout;

export default function Homepage() {
  const [theme, setTheme] = useState("light");
  const [collapsed, setCollapsed] = useState(false);

const toggleTheme = (checked) => {
  const newTheme = checked ? "dark" : "light";
  setTheme(newTheme);
};
useEffect(() => {
  document.body.style.backgroundColor = theme === "dark" ? "#141414" : "#ffffff";
  document.body.style.color = theme === "dark" ? "#ffffff" : "#000000";
}, [theme]);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link className="linkText" to="/doctor">Home</Link>,
    },
    {
      key: "2",
      icon: <MedicineBoxOutlined />,
      label: <Link className="linkText" to="/doctor/treamtentplan">Treatment Plan</Link>,
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: <Link  className="linkText" to="/doctor/prescription">Generate Prescription</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme={theme}
        width={250}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#fff",
            backgroundColor:"#21e375ff"
          }}
        >
          <DashboardOutlined style={{ fontSize: 24 }} />
          {!collapsed && <span style={{ marginLeft: 10 }}>Doctor DashBoard</span>}
        </div>
        <Menu theme={theme} mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
      </Sider>

      <Layout>
        <Header
          style={{
            background: theme === "dark" ? "#141414" : "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div onClick={toggleCollapsed} style={{ fontSize: 20, cursor: "pointer" }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div>
            <span style={{ marginRight: 8 }}>Dark Mode</span>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </Header>

  <Content
  style={{
    margin: "24px",
    background: theme === "dark" ? "#1f1f1f" : "#fff",
    padding: 24,
    borderRadius: 8,
    color: theme === "dark" ? "#ffffff" : "#000000",  // 👈 text color
  }}
>
  <Card
    title="Life AI Tools"
    headStyle={{
      backgroundColor: theme === "dark" ? "#141414" : "#21e375ff",
      color: "#fff",
    }}
    bodyStyle={{
      backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
      color: theme === "dark" ? "#ffffff" : "#000000",  // 👈 text color
    }}
  >
    <Outlet />
  </Card>
</Content>

      </Layout>
    </Layout>
  );
}
