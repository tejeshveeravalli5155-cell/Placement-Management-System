import { useEffect, useState } from "react";
import "./Dashboard.css";
import Clock from "../Clock/Clock";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { getUser } from "../../utils/auth";
import { AiOutlineTeam, AiOutlineBank, AiOutlineCheckCircle, AiOutlinePercentage } from "react-icons/ai";

function Dashboard() {
  const user = getUser();

  const [studentCount, setStudentCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [placedCount, setPlacedCount] = useState(0);
  const [placementRate, setPlacementRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);

      const [studentsRes, companiesRes, placementStatsRes] = await Promise.all([
        api.get("/students?limit=1"),
        api.get("/companies?limit=1"),
        api.get("/placements/stats"),
      ]);

      setStudentCount(studentsRes.data?.pagination?.totalStudents ?? 0);
      setCompanyCount(companiesRes.data?.pagination?.totalCompanies ?? 0);
      setPlacedCount(placementStatsRes.data?.stats?.totalPlaced ?? 0);
      setPlacementRate(placementStatsRes.data?.stats?.placementRate ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="dashboard-subtitle">Here's what's happening with your placements today.</p>
        </div>
        <Clock />
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <AiOutlineTeam className="stat-icon" />
          <div>
            <h2>{loading ? "…" : studentCount}</h2>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <AiOutlineBank className="stat-icon" />
          <div>
            <h2>{loading ? "…" : companyCount}</h2>
            <p>Companies</p>
          </div>
        </div>

        <div className="stat-card">
          <AiOutlineCheckCircle className="stat-icon" />
          <div>
            <h2>{loading ? "…" : placedCount}</h2>
            <p>Students Placed</p>
          </div>
        </div>

        <div className="stat-card">
          <AiOutlinePercentage className="stat-icon" />
          <div>
            <h2>{loading ? "…" : `${placementRate}%`}</h2>
            <p>Placement Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-links">
        <Link to="/students" className="dashboard-link-card">Manage Students →</Link>
        <Link to="/companies" className="dashboard-link-card">Manage Companies →</Link>
        <Link to="/placements" className="dashboard-link-card">Track Placements →</Link>
        <Link to="/reports" className="dashboard-link-card">View Reports →</Link>
      </div>
    </div>
  );
}

export default Dashboard;
