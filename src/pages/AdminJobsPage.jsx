import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, InputNumber, Tag, message, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../api/axios.js";

const { Title } = Typography;
const { TextArea } = Input;

function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (err) {
      message.error(err.response?.data?.error || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateJob(values) {
    setCreating(true);
    try {
      await api.post("/jobs", values);
      message.success("Job posted successfully");
      setModalOpen(false);
      form.resetFields();
      fetchJobs(); // refresh the list to show the new job
    } catch (err) {
      message.error(err.response?.data?.error || "Failed to create job");
    } finally {
      setCreating(false);
    }
  }

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Type",
      dataIndex: "employmentType",
      key: "employmentType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Threshold",
      dataIndex: "scoreThreshold",
      key: "scoreThreshold",
      render: (val) => `${val}/100`,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "default"}>{isActive ? "Active" : "Closed"}</Tag>
      ),
    },
    {
      title: "Posted",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Job Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          Post New Job
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Post a New Job"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleCreateJob}>
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Please enter a job title" }]}
          >
            <Input placeholder="e.g. Senior Backend Engineer" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={3} placeholder="What the role involves..." />
          </Form.Item>

          <Form.Item
            label="Requirements"
            name="requirements"
            rules={[{ required: true, message: "Please enter requirements" }]}
            extra="This is what the AI uses to evaluate candidates — be specific."
          >
            <TextArea rows={3} placeholder="e.g. 3+ years React, strong JavaScript, REST APIs..." />
          </Form.Item>

          <Form.Item label="Location" name="location" initialValue="Remote">
            <Input placeholder="e.g. Remote, San Francisco, CA" />
          </Form.Item>

          <Form.Item label="Employment Type" name="employmentType" initialValue="Full-time">
            <Select
              options={[
                { value: "Full-time", label: "Full-time" },
                { value: "Part-time", label: "Part-time" },
                { value: "Contract", label: "Contract" },
                { value: "Internship", label: "Internship" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Score Threshold"
            name="scoreThreshold"
            initialValue={70}
            extra="Minimum AI score (0–100) needed to shortlist a candidate for this job."
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button onClick={() => setModalOpen(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={creating}>
              Post Job
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminJobsPage;