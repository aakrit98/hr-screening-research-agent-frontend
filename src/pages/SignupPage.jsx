import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Alert } from "antd";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const { Title } = Typography;

function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", values);
      const { token, user } = response.data;
      login(user, token);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Title level={3}>Create Account</Title>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
          <Input type="email" placeholder="you@example.com" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter a password" }, { min: 6, message: "Password must be at least 6 characters" }]}>
          <Input.Password placeholder="••••••••" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>Sign Up</Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;