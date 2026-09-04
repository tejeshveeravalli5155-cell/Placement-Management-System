import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";
import './CompanyRegistration.css';

function CompanyRegistration() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(e) {
    const { name, value } = e.target;

    setCompany({
      ...company,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailPattern.test(company.email)) {
      toast.error("Enter a valid HR email");
      return;
    }

    if (company.phone.length !== 10 || isNaN(company.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/companies", company);

      toast.success(response.data.message || "Company Registered Successfully!");

      setCompany({
        companyName: "",
        location: "",
        hrName: "",
        email: "",
        phone: "",
        package: "",
        jobRole: "",
        eligibility: "",
      });

      navigate("/companies");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Company registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="company-registration">
      <h1>Company Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={company.companyName}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={company.location}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="text"
          name="hrName"
          placeholder="HR Name"
          value={company.hrName}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="HR Email"
          value={company.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={company.phone}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={company.jobRole}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="text"
          name="package"
          placeholder="Package (LPA)"
          value={company.package}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="text"
          name="eligibility"
          placeholder="Eligibility Criteria"
          value={company.eligibility}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Company"}
        </button>
      </form>
    </div>
  );
}

export default CompanyRegistration;
