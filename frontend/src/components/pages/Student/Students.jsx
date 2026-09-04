import { useEffect, useState } from "react";
import Student from "../../StudentTable/StudentTable";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { useToast } from "../../Toast/ToastContext";

function Students() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // Sorting
  const [sortField, setSortField] = useState("studentName");
  const [order, setOrder] = useState("asc");

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/students?page=${page}&limit=5&sort=${sortField}&order=${order}`
      );

      if (Array.isArray(response.data.students)) {
        setStudents(response.data.students);
        setPagination(response.data.pagination);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load students.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [page, sortField, order]);

  return (
    <div className="page-container">
      <h1>Student Management</h1>

      <p>Manage all registered students here.</p>

      <Link to="/register">
        <button className="add-btn">+ Add New Student</button>
      </Link>

      {/* Sort Controls */}
      <div className="sort-container">
        <label>Sort By:</label>

        <select
          value={sortField}
          onChange={(e) => {
            setPage(1);
            setSortField(e.target.value);
          }}
        >
          <option value="studentName">Name</option>
          <option value="email">Email</option>
          <option value="branch">Branch</option>
          <option value="cgpa">CGPA</option>
        </select>

        <select
          value={order}
          onChange={(e) => {
            setPage(1);
            setOrder(e.target.value);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : students.length > 0 ? (
        <>
          <Student
            students={students}
            setStudents={setStudents}
          />

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>

              {Array.from(
                { length: pagination.totalPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    className={
                      page === index + 1
                        ? "active-page"
                        : ""
                    }
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <h3>No Students Registered</h3>
      )}
    </div>
  );
}

export default Students;
