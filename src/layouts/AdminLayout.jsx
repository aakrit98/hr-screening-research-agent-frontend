import { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Dropdown,
  Space,
  Input,
  Badge,
  Breadcrumb,
  Tooltip,
  Button,
} from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  ProjectOutlined,
  TeamOutlined,
  LogoutOutlined,
  DownOutlined,
  FileSearchOutlined,
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext.jsx";

const { Sider, Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
       { key: "/admin", icon: <HomeOutlined />, label: "Dashboard" },

    { key: "/admin/jobs", icon: <ProjectOutlined />, label: "Job Management" }, 
    { key: "/admin/candidates", icon: <TeamOutlined />, label: "Screening" }, 
     { key: "/admin/analytics", icon: <BarChartOutlined />, label: "Analytics" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const profileMenuItems = [
    { key: "profile", icon: <UserOutlined />, label: user?.name || "Profile", disabled: true },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
  ];

  const activeKey =
    menuItems.find((i) => location.pathname.startsWith(i.key))?.key ??
    location.pathname;

  const currentLabel =
    menuItems.find((i) => i.key === activeKey)?.label ?? "Dashboard"; 

    <Sider
  style={{
    position: "relative",
    minHeight: "100vh",
  }}
></Sider>

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6fb" }}>
      <Sider
        width={248}
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #111c35 60%, #0b1220 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "20px 16px" : "22px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              minWidth: 38,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg,#6366f1,#22d3ee)",
              boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
            }}
          >
            <FileSearchOutlined style={{ color: "#fff", fontSize: 19 }} />
          </div>
          {!collapsed && (
            <div style={{ lineHeight: 1.15 }}>
              <Title level={5} style={{ color: "#fff", margin: 0, letterSpacing: 0.3 }}>
                CV Analyzer
              </Title>
              <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                HR Screening
              </Text>
            </div>
          )}
        </div> 

       

            

        {/* Section label */}
        {!collapsed && (
          <Text
            style={{
              display: "block",
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              padding: "18px 24px 8px",
            }}
          >
            Workspace
          </Text>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: "transparent", border: "none", padding: "4px 8px" }}
        />

        {/* AI insight card */}
        {!collapsed && (
          <div
            style={{
              margin: "24px 16px",
              padding: 16,
              borderRadius: 14,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.28)",
            }}
          >
            <Space size={8}>
              <ThunderboltOutlined style={{ color: "#a5b4fc" }} />
              <Text style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>
                AI Matching
              </Text>
            </Space>

           

            <Text
              style={{
                display: "block",
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                marginTop: 6,
              }}
            >
              Resumes are auto-scored against each job description.
            </Text>

          </div>

          
        )}

<div
  style={{
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
>
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed((c) => !c)}
    style={{
      width: 42,
      height: 42,
      borderRadius: 10,
      background: "#f5f5f5",
    }}
  />
</div>

      </Sider>

      <Layout style={{ background: "transparent" }}>
        <Header
          style={{
            background: "rgba(180, 1, 1, 0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e8ecf4",
            padding: "0 24px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Space size={16}>
            
            <div style={{ lineHeight: 1.2 }}>
              <Text strong style={{ fontSize: 16 }}>
                {currentLabel}
              </Text>
              <Breadcrumb
                style={{ fontSize: 12 }}
                items={[{ title: "Admin" }, { title: currentLabel }]}
              />
            </div>
          </Space>

          <Space size={18}>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
              placeholder="Search candidates or jobs..."
              style={{ width: 280, borderRadius: 10, background: "#f6f8fc" }}
            />

            <Tooltip title="Notifications">
              <Badge count={3} size="small">
                <BellOutlined style={{ fontSize: 18, color: "#475569" }} />
              </Badge>
            </Tooltip>

            <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
              <Space>             
             
                <div style={{ textAlign: "right", lineHeight: 1.15 }}>
                  <Text strong style={{ display: "block", fontSize: 13 }}>
                    {user?.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    Admin Panel
                  </Text>
                </div>
                <Avatar
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#22d3ee)",
                    fontWeight: 600,
                  }}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <DownOutlined style={{ fontSize: 10, color: "#94a3b8" }} />
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ padding: 24 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 24,
              minHeight: "calc(100vh - 172px)",
              border: "1px solid #eef1f6",
              boxShadow: "0 10px 30px -22px rgba(15,23,42,0.35)",
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ background: "transparent", textAlign: "center", padding: "0 24px 20px" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            CV Analyzer • AI-assisted resume screening
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
