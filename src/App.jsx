import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import AdminCandidatesPage from "./pages/AdminCandidatesPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import JobDetailPage from "./pages/JobDetailPage.jsx";
import AdminCandidateDetailPage from "./pages/AdminCandidateDetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <JobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/candidates"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCandidatesPage />
            </ProtectedRoute>
          }
        />

          <Route  
              path="/jobs/:jobId" 
              element = { 
                <ProtectedRoute allowedRoles={["user"]}> 
                    <JobDetailPage/>
                </ProtectedRoute>
              }
            /> 

            <Route
  path="/admin/candidates/:candidateId"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminCandidateDetailPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;