import { useState, useEffect } from "react";
import api from "../api/axios.js";

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const [jobsRes, candidatesStatsRes] = await Promise.all([
          api.get("/jobs"),
          api.get("/candidates/stats"),
        ]);

        const totalCandidates = candidatesStatsRes.data.reduce((sum, j) => sum + j.total, 0);
        const shortlisted = candidatesStatsRes.data.reduce((sum, j) => sum + j.shortlisted, 0);
        const rejected = candidatesStatsRes.data.reduce((sum, j) => sum + j.rejected, 0);
        const pending = candidatesStatsRes.data.reduce((sum, j) => sum + j.pending, 0);

        setStats({
          totalJobs: jobsRes.data.length,
          totalCandidates,
          shortlisted,
          rejected,
          pending,
        });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}