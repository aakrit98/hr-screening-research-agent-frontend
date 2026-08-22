import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Tag, Space, Button, Upload, Spin, Alert, message } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import api from "../api/axios.js";

const { Title, Paragraph, Text } = Typography;

function JobDetailPage() {
  const { jobId } = useParams(); // grabs :jobId from the URL
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await api.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load job");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  async function handleUpload() {
    if (!file) {
      message.warning("Please select a CV file first");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("cv", file); // "cv" must match multer's upload.single("cv") on the backend

      await api.post(`/candidates/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setApplied(true);
      message.success("Application submitted successfully!");
    } catch (err) {
      message.error(err.response?.data?.error || "Failed to submit application");
    } finally {
      setUploading(false);
    }
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

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/jobs")} style={{ marginBottom: 16 }}>
        Back to Jobs
      </Button>

      <Card>
        <Title level={2}>{job.title}</Title>
        <Space size={8} style={{ marginBottom: 16 }}>
          <Tag color="blue">{job.employmentType}</Tag>
          <Tag>{job.location}</Tag>
        </Space>

        <Title level={5}>Description</Title>
        <Paragraph>{job.description}</Paragraph>

        <Title level={5}>Requirements</Title>
        <Paragraph>{job.requirements}</Paragraph>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
          {applied ? (
            <Alert
              message="Application Submitted"
              description="Your CV has been received. You'll be notified of updates."
              type="success"
              showIcon
            />
          ) : (
            <>
              <Title level={5}>Apply to this position</Title>
              <Upload
                beforeUpload={(selectedFile) => {
                  setFile(selectedFile);
                  return false; // stop Ant Design from auto-uploading — we handle it manually
                }}
                maxCount={1}
                accept=".pdf"
              >
                <Button icon={<UploadOutlined />}>Select CV (PDF)</Button>
              </Upload>

              {file && <Text style={{ display: "block", marginTop: 8 }}>Selected: {file.name}</Text>}

              <Button
                type="primary"
                onClick={handleUpload}
                loading={uploading}
                style={{ marginTop: 16 }}
                disabled={!file}
              >
                Submit Application
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default JobDetailPage;