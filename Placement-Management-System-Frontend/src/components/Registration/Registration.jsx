import { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useToast } from "../Toast/ToastContext";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCGPA] = useState("");

  const [loading, setLoading] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function registerStudent(e) {
    e.preventDefault();

    // ======================
    // Validation
    // ======================

    if (studentName.trim() === "") {
      toast.error("Name is required");
      return;
    }

    if (!emailPattern.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    if (branch.trim() === "") {
      toast.error("Branch is required");
      return;
    }

    if (
      cgpa === "" ||
      Number(cgpa) < 0 ||
      Number(cgpa) > 10
    ) {
      toast.error("CGPA must be between 0 and 10");
      return;
    }

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must contain at least 8 characters with uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoading(true);

    try {
      // ======================
      // Register User + Student
      // ======================

      const response = await api.post("/auth/register", {
        name: studentName,
        email: email,
        password: password,
        phone: phone,
        branch: branch,
        cgpa: Number(cgpa),
      });

      toast.success(
        response.data.message ||
          "Registration successful!"
      );

      // Clear form
      setStudentName("");
      setPassword("");
      setEmail("");
      setPhone("");
      setBranch("");
      setCGPA("");

      // Go to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <h1>Student Registration</h1>

      <form onSubmit={registerStudent}>
        <input
          type="text"
          placeholder="Enter Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(e.target.value)
          }
          disabled={loading}
        />

        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          disabled={loading}
        />

        <br />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          disabled={loading}
        />

        <br />

        <select
          value={branch}
          onChange={(e) =>
            setBranch(e.target.value)
          }
          disabled={loading}
        >
          <option value="">
            Select Branch
          </option>

          <option value="CSE">
            CSE
          </option>

          <option value="CSM">
            CSM
          </option>

          <option value="CSE-AI">
            CSE-AI
          </option>

          <option value="CIVIL">
            CIVIL
          </option>

          <option value="DS">
            DS
          </option>
        </select>

        <br />

        <input
          type="number"
          placeholder="Enter CGPA"
          value={cgpa}
          onChange={(e) =>
            setCGPA(e.target.value)
          }
          disabled={loading}
          step="0.01"
          min="0"
          max="10"
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <br />
        <br />

        <h4>Already Have An Account?</h4>

        <button
          type="button"
          onClick={() => navigate("/login")}
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
