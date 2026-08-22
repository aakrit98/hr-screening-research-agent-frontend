import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Tag, Button, Spin, Alert, Descriptions, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import api from "../api/axios.js";

const { Title, Paragraph, Text } = Typography;

function AdminCandidateDetailPage() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null); // will hold { candidate, screening }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCandidate() {
      try {
        const response = await api.get(`/candidates/${candidateId}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load candidate");
      } finally {
        setLoading(false);
      }
    }
    fetchCandidate();
  }, [candidateId]);

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

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  const { candidate, screening } = data;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/candidates")} style={{ marginBottom: 16 }}>
        Back to Candidates
      </Button>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <Title level={3} style={{ marginBottom: 4 }}>{candidate.user?.name}</Title>
            <Text type="secondary">{candidate.user?.email}</Text>
          </div>
          <Tag color={statusColor(candidate.status)} style={{ fontSize: 14, padding: "4px 12px" }}>
            {candidate.status}
          </Tag>
        </div>

        <Divider />

        <Descriptions column={1} size="small">
          <Descriptions.Item label="Applied For">{candidate.job?.title}</Descriptions.Item>
          <Descriptions.Item label="Applied On">
            {new Date(candidate.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="CV">
            <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer">
              View Original PDF
            </a>
          </Descriptions.Item>
        </Descriptions>

        {!screening && (
          <Alert
            message="Screening still in progress"
            description="The AI evaluation hasn't completed yet. Refresh in a moment."
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}

        {screening && (
          <>
            <Divider orientation="left">AI Score</Divider>
            <Title level={2} style={{ color: statusColor(candidate.status) === "green" ? "#52c41a" : "#ff4d4f" }}>
              {screening.score} / 100
            </Title>

            <Divider orientation="left">CV Analysis</Divider>
            <Paragraph style={{ whiteSpace: "pre-line" }}>{screening.analysis}</Paragraph>

            <Divider orientation="left">Decision Reasoning</Divider>
            <Paragraph>{screening.reason}</Paragraph>

            <Divider orientation="left">Generated Email</Divider>
            <Card size="small" style={{ background: "#fafafa" }}>
              <Paragraph style={{ whiteSpace: "pre-line", marginBottom: 0 }}>{screening.email}</Paragraph>
            </Card>

            <Divider orientation="left">Reviewer Feedback</Divider>
            <Tag color={screening.review?.approved ? "green" : "red"} style={{ marginBottom: 8 }}>
              {screening.review?.approved ? "Approved" : "Flagged"}
            </Tag>
            <Paragraph style={{ whiteSpace: "pre-line" }}>{screening.review?.feedback}</Paragraph>
          </>
        )}
      </Card>
    </div>
  );
}

export default AdminCandidateDetailPage;