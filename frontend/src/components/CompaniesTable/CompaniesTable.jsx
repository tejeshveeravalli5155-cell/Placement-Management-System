import { Link } from "react-router-dom";

function CompaniesTable({ companies, onDelete }) {
  return (
    <div className="table-container">
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Company</th>
            <th>Location</th>
            <th>HR Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Role</th>
            <th>Package</th>
            <th>Eligibility</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.companyName}</td>
              <td>{company.location}</td>
              <td>{company.hrName}</td>
              <td>{company.email}</td>
              <td>{company.phone}</td>
              <td>{company.jobRole}</td>
              <td>{company.package}</td>
              <td>{company.eligibility}</td>
              <td>
                <Link to={`/companies/edit/${company._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => onDelete(company._id)}>
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

export default CompaniesTable;
