import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import JobDetailPage from "./pages/JobDetailPage.jsx";
 import AdminCandidatesPage from "./pages/AdminCandidatesPage.jsx";
import AdminCandidateDetailPage from "./pages/AdminCandidateDetailPage.jsx";
 import AdminJobsPage from "./pages/AdminJobsPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/jobs"
          element={<ProtectedRoute allowedRoles={["user"]}><JobsPage /></ProtectedRoute>}
        />
        <Route
          path="/jobs/:jobId"
          element={<ProtectedRoute allowedRoles={["user"]}><JobDetailPage /></ProtectedRoute>}
        />

        {/* Admin routes all share the sidebar layout */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}
        >
          <Route path="jobs" element={<AdminJobsPage />} />
         <Route path="candidates" element={<AdminCandidatesPage />} />
          <Route path="candidates/:candidateId" element={<AdminCandidateDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;