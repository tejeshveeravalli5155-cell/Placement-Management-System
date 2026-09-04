import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard">
        <button className="add-btn">Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default NotFound;
