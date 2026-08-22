import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Tag, Button, Spin, Alert, Space } from "antd";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const { Title, Paragraph, Text } = Typography;

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []); // empty array = run once when the page first loads

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Open Positions</Title>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      {jobs.length === 0 && !error && (
        <Text type="secondary">No open positions right now. Check back later.</Text>
      )}

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {jobs.map((job) => (
          <Card key={job._id} hoverable onClick={() => navigate(`/jobs/${job._id}`)}>
            <Title level={4} style={{ marginBottom: 4 }}>{job.title}</Title>
            <Space size={8} style={{ marginBottom: 8 }}>
              <Tag color="blue">{job.employmentType}</Tag>
              <Tag>{job.location}</Tag>
            </Space>
            <Paragraph ellipsis={{ rows: 2 }} type="secondary">
              {job.description}
            </Paragraph>
          </Card>
        ))}
      </Space>
    </div>
  );
}

export default JobsPage;