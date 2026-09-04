import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";
import "../EditStudent/EditStudent.css";

function PlacementRegistration() {
  const navigate = useNavigate();
  const toast = useToast();

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    student: "",
    company: "",
    package: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  async function fetchOptions() {
    try {
      setLoadingOptions(true);
      const [studentsRes, companiesRes] = await Promise.all([
        api.get("/students?limit=500"),
        api.get("/companies?limit=500"),
      ]);
      setStudents(studentsRes.data.students || []);
      setCompanies(companiesRes.data.companies || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load students/companies.");
    } finally {
      setLoadingOptions(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Pre-fill the package from the selected company, editable afterwards.
    if (name === "company") {
      const selected = companies.find((c) => c._id === value);
      if (selected) {
        setForm((prev) => ({ ...prev, company: value, package: selected.package }));
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.student || !form.company || !form.package) {
      toast.error("Please select a student, a company, and a package.");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/placements", form);
      toast.success("Placement recorded successfully!");
      navigate("/placements");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to record placement.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingOptions) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-container">
      <h2>Record a Placement</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Student</label>
        <select name="student" value={form.student} onChange={handleChange}>
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.studentName} — {s.branch}
            </option>
          ))}
        </select>

        <label>Company</label>
        <select name="company" value={form.company} onChange={handleChange}>
          <option value="">Select a company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.companyName} — {c.jobRole}
            </option>
          ))}
        </select>

        <label>Package</label>
        <input
          name="package"
          value={form.package}
          onChange={handleChange}
          placeholder="e.g. 10 LPA"
        />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label>Notes (optional)</label>
        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any additional notes"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Record Placement"}
        </button>
      </form>
    </div>
  );
}

export default PlacementRegistration;
