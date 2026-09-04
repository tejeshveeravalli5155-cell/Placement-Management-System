import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Companies.css";
import CompaniesTable from "../CompaniesTable/CompaniesTable";
import api from "../../api/api";
import { useToast } from "../Toast/ToastContext";

function Companies() {
  const toast = useToast();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      setLoading(true);
      const response = await api.get("/companies?limit=100");
      setCompanies(response.data.companies || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load companies.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/companies/${id}`);
      toast.success(response.data.message || "Company deleted.");
      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete company.");
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const query = search.toLowerCase();
    return (
      company.companyName?.toLowerCase().includes(query) ||
      company.location?.toLowerCase().includes(query) ||
      company.hrName?.toLowerCase().includes(query) ||
      company.jobRole?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="companies">
      <h1>Companies</h1>
      <p>List of companies participating in placements.</p>

      <Link to="/company-registration">
        <button className="add-btn">+ Add New Company</button>
      </Link>

      <input
        type="text"
        placeholder="Search companies..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <h3>Loading...</h3>
      ) : filteredCompanies.length === 0 ? (
        <h3>No Companies Found</h3>
      ) : (
        <CompaniesTable
          companies={filteredCompanies}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Companies;
