import { useState, useEffect } from "react";
import { Card, Typography, Tag, Space, Spin, Alert, Empty } from "antd";
import api from "../api/axios.js";

const { Title, Text } = Typography;

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await api.get("/candidates/my-applications");
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  function statusColor(status) {
    if (status === "SHORTLISTED") return "green";
    if (status === "REJECTED") return "red";
    return "orange";
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: 24 }}>My Applications</Title>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      {applications.length === 0 && !error && (
        <Empty description="You haven't applied to any jobs yet" />
      )}

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {applications.map((app) => (
          <Card key={app._id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <Title level={4} style={{ marginBottom: 4 }}>{app.job?.title}</Title>
                <Space size={8} style={{ marginBottom: 8 }}>
                  <Tag color="blue">{app.job?.employmentType}</Tag>
                  <Tag>{app.job?.location}</Tag>
                </Space>
                <br />
                <Text type="secondary">
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </Text>
              </div>
              <Tag color={statusColor(app.status)} style={{ fontSize: 13, padding: "4px 12px" }}>
                {app.status}
              </Tag>
            </div>

            <div style={{ marginTop: 12 }}>
              <a href={app.cvUrl} target="_blank" rel="noopener noreferrer">
                View Submitted CV
              </a>
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
}

export default MyApplicationsPage;