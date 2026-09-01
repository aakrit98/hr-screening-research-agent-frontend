import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import JobDetailPage from "./pages/JobDetailPage.jsx";
import AdminCandidatesPage from "./pages/AdminCandidatesPage.jsx";
import AdminCandidateDetailPage from "./pages/AdminCandidateDetailPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import MyApplicationsPage from "./pages/MyApplicationsPage.jsx";
import AdminJobPage from "./pages/AdminJobsPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* candidate routes — share the sidebar layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
        </Route>

        {/* admin routes — share the sidebar layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/candidates" element={<AdminCandidatesPage />} />
          <Route path="/admin/candidates/:candidateId" element={<AdminCandidateDetailPage />} />
          <Route path="/admin/jobs" element={<AdminJobPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;