import { Layout, Menu, Avatar, Typography, Dropdown } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  ProjectOutlined,
  TeamOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext.jsx";

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: "/admin/jobs", icon: <ProjectOutlined />, label: "Job Management" },
    { key: "/admin/candidates", icon: <TeamOutlined />, label: "Screening" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const profileMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}>
        <div style={{ padding: "20px 24px", fontWeight: 700, fontSize: 18 }}>
          HR Screening
        </div>
        <div style={{ padding: "0 16px 8px", fontSize: 12, color: "#999", textTransform: "uppercase" }}>
          Admin
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ border: "none" }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ textAlign: "right" }}>
                <Text strong style={{ display: "block", fontSize: 13, lineHeight: 1.3 }}>
                  {user?.name}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Admin Panel</Text>
              </div>
              <Avatar style={{ background: "#7265e6" }}>
                {user?.name?.[0]?.toUpperCase()}
              </Avatar>
              <DownOutlined style={{ fontSize: 10, color: "#999" }} />
            </div>
          </Dropdown>
        </Header>

        <Content style={{ background: "#f5f5f5", padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;