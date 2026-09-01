import { Layout, Menu, Avatar, Typography } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  ProjectOutlined,
  TeamOutlined,
  BarChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext.jsx";

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const candidateItems = [
    { key: "/jobs", icon: <SearchOutlined />, label: "Browse Jobs" },
    { key: "/my-applications", icon: <FileTextOutlined />, label: "My Applications" },
  ];

const adminItems = [
  { key: "/admin", icon: <HomeOutlined />, label: "Dashboard" },
  { key: "/admin/jobs", icon: <ProjectOutlined />, label: "Job Management" },
  { key: "/admin/candidates", icon: <TeamOutlined />, label: "Screening" },
  { key: "/admin/analytics", icon: <BarChartOutlined />, label: "Analytics" },
];

  const menuItems = user?.role === "admin" ? adminItems : candidateItems;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
        <div style={{ padding: "20px 24px", fontWeight: 600, fontSize: 18 }}>
          TalentBridge
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: "none" }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 24px",
            gap: 12,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <Text strong style={{ display: "block", lineHeight: 1.2 }}>{user?.name}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {user?.role === "admin" ? "Admin Panel" : "Candidate"}
            </Text>
          </div>
          <Avatar icon={<UserOutlined />} />
        </Header>

        <Content style={{ padding: 24, background: "#fafafa" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;