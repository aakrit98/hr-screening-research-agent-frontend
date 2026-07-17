import { useState } from "react";
import "./App.css"; 

function App() {
  // STATE — stores all data
  const [jobRequirements, setJobRequirements] = useState("");
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // SUBMIT — sends data to Express API
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://hr-screening-research-agent.onrender.com/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobRequirements }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h1>🤝 HR Screening Agent</h1>
        <p>AI-powered candidate screening system</p>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSubmit} className="form">

        <div className="field">
          <label>Job Requirements</label>
          <textarea
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            placeholder="Senior JavaScript Developer. Required: React, Node.js, 5+ years experience..."
            rows={4}
            required
          />
        </div>

        <div className="field">
          <label>Candidate CV</label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste candidate CV here..."
            rows={6}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Screening..." : "🔍 Screen Candidate"}
        </button>
      </form>

      {/* ERROR */}
      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>5 AI agents are analyzing the candidate...</p>
          <small>This takes 30-60 seconds</small>
        </div>
      )}

      {/* RESULTS */}
      {result && (
        <div className="results">
          <h2>Screening Results</h2>

          {/* CANDIDATE INFO */}
          <div className="card">
            <h3>👤 {result.candidateName}</h3>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${result.score}%`,
                  background: result.score >= 70 ? "#00C9A7" : "#FF4444"
                }}
              />
            </div>
            <p className="score-text">Score: {result.score}/100</p>
          </div>

          {/* DECISION */}
          <div className={`decision ${result.decision === "SHORTLISTED" ? "shortlisted" : "rejected"}`}>
            {result.decision === "SHORTLISTED" ? "✅ SHORTLISTED" : "❌ REJECTED"}
          </div>

          {/* REASON */}
          <div className="card">
            <h3>📋 Decision Reason</h3>
            <p>{result.reason}</p>
          </div>

          {/* EMAIL */}
          <div className="card">
            <h3>📧 Generated Email</h3>
            <pre>{result.email}</pre>
          </div>

          {/* REVIEW */}
          <div className={`card review ${result.review.approved ? "approved" : "not-approved"}`}>
            <h3>🔍 AI Review</h3>
            <p>{result.review.feedback}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;