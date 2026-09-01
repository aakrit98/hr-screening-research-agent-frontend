import { useNavigate } from "react-router-dom";
import { Typography, Card, Row, Col, Statistic, Button, Spin, Alert } from "antd";
import {
  ProjectOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext.jsx";
import { useDashboardStats } from "../hooks/useDashboardState.js";

const { Title, Text } = Typography;

function AdminDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: 4 }}>Welcome back, {user?.name}</Title>
      <Text type="secondary">Here's what's happening with your hiring pipeline.</Text>

      {error && <Alert message={error} type="error" showIcon style={{ margin: "16px 0" }} />}

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Active Jobs" value={stats.totalJobs} prefix={<ProjectOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Applicants" value={stats.totalCandidates} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Review"
              value={stats.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Shortlisted"
              value={stats.shortlisted}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Rejected"
              value={stats.rejected}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={5}>Quick Actions</Title>
        <Button type="primary" onClick={() => navigate("/admin/jobs")} style={{ marginRight: 12 }}>
          Manage Jobs
        </Button>
        <Button onClick={() => navigate("/admin/candidates")} style={{ marginRight: 12 }}>
          Review Candidates
        </Button>
        <Button onClick={() => navigate("/admin/analytics")}>
          View Analytics
        </Button>
      </Card>
    </div>
  );
}

export default AdminDashboardPage;