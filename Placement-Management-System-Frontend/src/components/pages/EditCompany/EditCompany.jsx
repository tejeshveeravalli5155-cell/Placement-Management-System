import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";
import "../EditStudent/EditStudent.css";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [company, setCompany] = useState({
    companyName: "",
    location: "",
    hrName: "",
    email: "",
    phone: "",
    package: "",
    jobRole: "",
    eligibility: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await api.get(`/companies/${id}`);
      setCompany(response.data.company);
    } catch (error) {
      console.error(error);
      toast.error("Company not found");
    } finally {
      setFetching(false);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/companies/${id}`, company);

      toast.success("Company Updated Successfully");
      navigate("/companies");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-container">
      <h2>Edit Company</h2>

      <form onSubmit={handleUpdate} className="edit-form">
        <label>Company Name</label>
        <input
          name="companyName"
          value={company.companyName}
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          name="location"
          value={company.location}
          onChange={handleChange}
        />

        <label>HR Name</label>
        <input
          name="hrName"
          value={company.hrName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          value={company.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="phone"
          value={company.phone}
          onChange={handleChange}
        />

        <label>Job Role</label>
        <input
          name="jobRole"
          value={company.jobRole}
          onChange={handleChange}
        />

        <label>Package</label>
        <input
          name="package"
          value={company.package}
          onChange={handleChange}
        />

        <label>Eligibility</label>
        <input
          name="eligibility"
          value={company.eligibility}
          onChange={handleChange}
        />

        <button disabled={loading} type="submit">
          {loading ? "Updating company..." : "Update Company"}
        </button>
      </form>
    </div>
  );
}

export default EditCompany;
