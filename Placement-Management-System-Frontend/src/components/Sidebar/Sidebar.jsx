import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../../utils/auth";

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <ul className="sidebar">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Dashboard</li>
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Student Registration</li>
      </NavLink>

      <NavLink
        to="/students"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Students</li>
      </NavLink>

      <NavLink
        to="/companies"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Companies</li>
      </NavLink>

      <NavLink
        to="/company-registration"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Company Registration</li>
      </NavLink>

      <NavLink
        to="/placements"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Placements</li>
      </NavLink>

      <NavLink
        to="/placements/new"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Record Placement</li>
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Reports</li>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <li>Settings</li>
      </NavLink>

      <button onClick={handleLogout} className="sidebar-logout">
        <li>Logout</li>
      </button>
    </ul>
  );
}

export default Sidebar;
