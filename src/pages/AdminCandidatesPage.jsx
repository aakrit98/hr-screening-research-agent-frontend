import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Typography, Button, Spin, Alert } from "antd";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const { Title } = Typography;

function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await api.get("/candidates");
        setCandidates(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    }
    fetchCandidates();
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function statusColor(status) {
    if (status === "SHORTLISTED") return "green";
    if (status === "REJECTED") return "red";
    return "orange"; // PENDING
  }

  const columns = [
    {
      title: "Candidate",
      key: "candidate",
      render: (_, record) => record.user?.name || "—",
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.user?.email || "—",
    },
    {
      title: "Job",
      key: "job",
      render: (_, record) => record.job?.title || "—",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => <Tag color={statusColor(record.status)}>{record.status}</Tag>,
    },
    {
      title: "Applied",
      key: "createdAt",
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button size="small" onClick={() => navigate(`/admin/candidates/${record._id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
     
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Table
        columns={columns}
        dataSource={candidates}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default AdminCandidatesPage;