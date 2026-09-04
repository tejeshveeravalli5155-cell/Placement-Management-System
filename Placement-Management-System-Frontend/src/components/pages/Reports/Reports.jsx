import { useEffect, useState } from "react";
import "./Reports.css";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";

function Reports() {
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      const response = await api.get("/placements/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load reports.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!stats) {
    return <h2>No data available</h2>;
  }

  const maxStatusCount = Math.max(
    1,
    ...stats.statusBreakdown.map((s) => s.count)
  );
  const maxBranchCount = Math.max(
    1,
    ...stats.branchBreakdown.map((b) => b.count)
  );
  const maxCompanyCount = Math.max(
    1,
    ...stats.topCompanies.map((c) => c.count)
  );

  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>An overview of placement activity across all students and companies.</p>

      <div className="reports-summary">
        <div className="stat-card">
          <h2>{stats.totalStudents}</h2>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h2>{stats.totalPlaced}</h2>
          <p>Students Placed</p>
        </div>
        <div className="stat-card">
          <h2>{stats.placementRate}%</h2>
          <p>Placement Rate</p>
        </div>
      </div>

      <div className="report-section">
        <h3>Applications by Status</h3>
        {stats.statusBreakdown.length === 0 ? (
          <p className="empty-note">No placement records yet.</p>
        ) : (
          stats.statusBreakdown.map((s) => (
            <div className="bar-row" key={s._id}>
              <span className="bar-label">{s._id}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill status-${s._id.toLowerCase()}`}
                  style={{ width: `${(s.count / maxStatusCount) * 100}%` }}
                />
              </div>
              <span className="bar-value">{s.count}</span>
            </div>
          ))
        )}
      </div>

      <div className="report-section">
        <h3>Selected Students by Branch</h3>
        {stats.branchBreakdown.length === 0 ? (
          <p className="empty-note">No students have been marked "Selected" yet.</p>
        ) : (
          stats.branchBreakdown.map((b) => (
            <div className="bar-row" key={b._id}>
              <span className="bar-label">{b._id}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${(b.count / maxBranchCount) * 100}%` }}
                />
              </div>
              <span className="bar-value">{b.count}</span>
            </div>
          ))
        )}
      </div>

      <div className="report-section">
        <h3>Top Hiring Companies</h3>
        {stats.topCompanies.length === 0 ? (
          <p className="empty-note">No companies have selected students yet.</p>
        ) : (
          stats.topCompanies.map((c) => (
            <div className="bar-row" key={c._id}>
              <span className="bar-label">{c._id}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${(c.count / maxCompanyCount) * 100}%` }}
                />
              </div>
              <span className="bar-value">{c.count}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reports;
