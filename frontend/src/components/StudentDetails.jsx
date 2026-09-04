import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { useToast } from "./Toast/ToastContext";

function StudentDetails() {
  const { id } = useParams();
  const toast = useToast();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);
      setStudent(response.data.student);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  return (
    <div className="student-details">
      <h1>Student Details</h1>
      <hr />

      <p><strong>ID:</strong> {student._id}</p>
      <p><strong>Name:</strong> {student.studentName}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Branch:</strong> {student.branch}</p>
      <p><strong>CGPA:</strong> {student.cgpa}</p>

      <br />

      <Link to="/students">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default StudentDetails;
