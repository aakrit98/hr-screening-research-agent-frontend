import { useState, useEffect } from "react";
import { Typography, Spin, Alert, Card, Row, Col, Statistic } from "antd";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TeamOutlined, CheckCircleOutlined, PercentageOutlined } from "@ant-design/icons";
import api from "../api/axios.js";

const { Title, Text } = Typography;

function AdminAnalyticsPage() {
  const [stats, setStats] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, distRes] = await Promise.all([
          api.get("/candidates/stats"),
          api.get("/candidates/score-distribution"),
        ]);
        setStats(statsRes.data);
        setDistribution(distRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <Alert message={error} type="error" showIcon />;

  const totalApplicants = stats.reduce((sum, j) => sum + j.total, 0);
  const totalShortlisted = stats.reduce((sum, j) => sum + j.shortlisted, 0);
  const shortlistRate = totalApplicants > 0 ? Math.round((totalShortlisted / totalApplicants) * 100) : 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: 24 }}>Analytics</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Applicants" value={totalApplicants} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Shortlisted"
              value={totalShortlisted}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Shortlist Rate"
              value={shortlistRate}
              suffix="%"
              prefix={<PercentageOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {stats.length === 0 ? (
        <Text type="secondary">No applications yet.</Text>
      ) : (
        <>
          <Card style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 16 }}>Applications per Job</Title>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jobTitle" angle={-30} textAnchor="end" interval={0} height={80} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="shortlisted" stackId="a" fill="#52c41a" name="Shortlisted" />
                <Bar dataKey="rejected" stackId="a" fill="#ff4d4f" name="Rejected" />
                <Bar dataKey="pending" stackId="a" fill="#faad14" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <Title level={5} style={{ marginBottom: 16 }}>Score Distribution</Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
}

export default AdminAnalyticsPage;