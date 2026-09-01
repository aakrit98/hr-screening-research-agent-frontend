import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Checkbox,
  Divider,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const { Title, Text } = Typography;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #f3f6fb 55%, #e9edff 100%)",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "390px",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
    padding: "18px 18px 20px",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "8px",
  },

  logo: {
    width: "38px",
    height: "38px",
    borderRadius: "4px",
    backgroundColor: "#f1f3f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "#172033",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "13px",
  },

  logoText: {
    fontSize: "6px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    marginTop: "2px",
  },

  header: {
    textAlign: "center",
    marginBottom: "18px",
  },

  title: {
    margin: "0 0 4px 0",
    fontSize: "21px",
    fontWeight: 600,
    color: "#171717",
  },

  subtitle: {
    color: "#666666",
    fontSize: "11px",
  },

  alert: {
    marginBottom: "12px",
    fontSize: "11px",
  },

  form: {
    width: "100%",
  },

  label: {
    display: "block",
    fontSize: "10px",
    color: "#444444",
    marginBottom: "5px",
    fontWeight: 500,
  },

  input: {
    height: "36px",
    borderRadius: "3px",
    backgroundColor: "#f1f3f5",
    border: "1px solid #edf0f2",
    fontSize: "11px",
  },

  passwordInput: {
    height: "36px",
    borderRadius: "3px",
    backgroundColor: "#f1f3f5",
    border: "1px solid #edf0f2",
    fontSize: "11px",
  },

  formItem: {
    marginBottom: "10px",
  },

  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-2px",
    marginBottom: "12px",
  },

  remember: {
    fontSize: "10px",
    color: "#555555",
  },

  forgot: {
    fontSize: "10px",
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: 500,
  },

  button: {
    height: "36px",
    borderRadius: "3px",
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
    fontWeight: 600,
    fontSize: "11px",
    boxShadow: "0 3px 7px rgba(79, 70, 229, 0.25)",
  },

  divider: {
    margin: "18px 0 12px",
    color: "#999999",
    fontSize: "8px",
  },

  socialButton: {
    width: "100%",
    height: "27px",
    borderRadius: "3px",
    fontSize: "10px",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  googleButton: {
    border: "1px solid #d9d9d9",
    backgroundColor: "#ffffff",
    color: "#333333",
  },

  linkedinButton: {
    border: "1px solid #0a66c2",
    backgroundColor: "#0a66c2",
    color: "#ffffff",
  },

  footer: {
    textAlign: "center",
    marginTop: "17px",
    fontSize: "9px",
    color: "#555555",
  },

  link: {
    color: "#333333",
    fontWeight: 600,
    textDecoration: "underline",
  },

  securityText: {
    marginTop: "20px",
    fontSize: "9px",
    color: "#a0a0a0",
    textAlign: "center",
  },
};

function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", values);

      const { token, user } = response.data;

      login(user, token);

      if (user.role === "admin") {
navigate("/admin");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <span>HR</span>
            <span style={styles.logoText}>BRIDGE</span>
          </div>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <Title level={3} style={styles.title}>
            Welcome back
          </Title>

          <Text style={styles.subtitle}>
            Sign in to your TalentBridge workspace.
          </Text>
        </div>

        {/* Error */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={styles.alert}
          />
        )}

        {/* Login Form */}
        <Form
          name="login"
          layout="vertical"
          onFinish={handleSubmit}
          style={styles.form}
        >
          {/* Email */}
          <Form.Item
            name="email"
            style={styles.formItem}
            label={
              <span style={styles.label}>
                Email Address
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              prefix={
                <MailOutlined
                  style={{ color: "#888", fontSize: "13px" }}
                />
              }
              placeholder="name@company.com"
              style={styles.input}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            style={styles.formItem}
            label={
              <span style={styles.label}>
                Password
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: "#888", fontSize: "13px" }}
                />
              }
              placeholder="••••••••"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined
                    style={{ color: "#888", fontSize: "13px" }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ color: "#888", fontSize: "13px" }}
                  />
                )
              }
              style={styles.passwordInput}
            />
          </Form.Item>

          {/* Remember / Forgot */}
          <div style={styles.optionsRow}>
            <Checkbox style={styles.remember}>
              Remember me
            </Checkbox>

            <Link to="/forgot-password" style={styles.forgot}>
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={styles.button}
            >
              Sign In
              <ArrowRightOutlined
                style={{ marginLeft: "5px" }}
              />
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <Divider style={styles.divider}>
          OR CONTINUE WITH
        </Divider>

        {/* Google */}
        <Button
          block
          icon={
            <GoogleOutlined
              style={{ color: "#4285F4" }}
            />
          }
          style={{
            ...styles.socialButton,
            ...styles.googleButton,
          }}
          onClick={() => {
            console.log("Google login clicked");
          }}
        >
          Google
        </Button>

        {/* LinkedIn */}
        <Button
          block
          icon={
            <LinkedinOutlined
              style={{ color: "#ffffff" }}
            />
          }
          style={{
            ...styles.socialButton,
            ...styles.linkedinButton,
          }}
          onClick={() => {
            console.log("LinkedIn login clicked");
          }}
        >
          LinkedIn
        </Button>

        {/* Signup */}
        <div style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </div>
      </div>

      {/* Bottom text */}
      <div style={styles.securityText}>
        Secure, enterprise-grade HR intelligence.
      </div>
    </div>
  );
}

export default LoginPage;