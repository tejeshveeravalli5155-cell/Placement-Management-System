import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StudentTable.css";
import api from "../../api/api";
import { useToast } from "../Toast/ToastContext";

function Student({ students = [], setStudents }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/students/${id}`);

      toast.success(response.data.message || "Student deleted.");

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete student.");
    }
  };

  // View Student
  const viewStudent = async (id) => {
    try {
      const response = await api.get(`/students/${id}`);

      navigate(`/student/${id}`, {
        state: {
          student: response.data.student,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to fetch student details.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.studentName?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query) ||
      student.phone?.toString().toLowerCase().includes(query) ||
      student.branch?.toLowerCase().includes(query) ||
      student.cgpa?.toString().includes(query)
    );
  });

  return (
    <>
      <h2>Registered Students</h2>

      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredStudents.length === 0 ? (
        <h3>No Students Found</h3>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>CGPA</th>
                <th>View</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.branch}</td>
                  <td>{student.cgpa}</td>

                  <td>
                    <button onClick={() => viewStudent(student._id)}>
                      View
                    </button>
                  </td>

                  <td>
                    <button onClick={() => deleteStudent(student._id)}>
                      Delete
                    </button>
                  </td>

                  <td>
                    <Link to={`/students/edit/${student._id}`}>
                      <button>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Student;
