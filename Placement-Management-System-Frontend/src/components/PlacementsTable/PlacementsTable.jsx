function PlacementsTable({ placements, onStatusChange, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Branch</th>
            <th>Company</th>
            <th>Package</th>
            <th>Status</th>
            <th>Applied On</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {placements.map((placement) => (
            <tr key={placement._id}>
              <td>{placement.student?.studentName || "—"}</td>
              <td>{placement.student?.branch || "—"}</td>
              <td>{placement.company?.companyName || "—"}</td>
              <td>{placement.package}</td>
              <td>
                <select
                  value={placement.status}
                  onChange={(e) =>
                    onStatusChange(placement._id, e.target.value)
                  }
                  className={`status-select status-${placement.status.toLowerCase()}`}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                {placement.appliedDate
                  ? new Date(placement.appliedDate).toLocaleDateString()
                  : "—"}
              </td>
              <td>
                <button onClick={() => onDelete(placement._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacementsTable;
