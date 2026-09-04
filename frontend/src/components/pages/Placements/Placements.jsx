import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Placements.css";
import api from "../../../api/api";
import PlacementsTable from "../../PlacementsTable/PlacementsTable";
import { useToast } from "../../Toast/ToastContext";

function Placements() {
  const toast = useToast();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacements();
  }, []);

  async function fetchPlacements() {
    try {
      setLoading(true);
      const response = await api.get("/placements?limit=100");
      setPlacements(response.data.placements || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load placements.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      const response = await api.put(`/placements/${id}`, { status });
      setPlacements((prev) =>
        prev.map((p) => (p._id === id ? response.data.placement : p))
      );
      toast.success(`Status updated to "${status}".`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Remove this placement record?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/placements/${id}`);
      setPlacements((prev) => prev.filter((p) => p._id !== id));
      toast.success("Placement removed.");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete placement.");
    }
  }

  return (
    <div className="placements-page">
      <h1>Placements</h1>
      <p>Track which students have been placed at which companies.</p>

      <Link to="/placements/new">
        <button className="add-btn">+ Record Placement</button>
      </Link>

      {loading ? (
        <h3>Loading...</h3>
      ) : placements.length === 0 ? (
        <h3>No Placements Recorded Yet</h3>
      ) : (
        <PlacementsTable
          placements={placements}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Placements;
