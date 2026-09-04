import './Navbar.css';
import { getUser } from '../utils/auth';
import { AiOutlineUser } from 'react-icons/ai';

function Navbar() {
  const user = getUser();

  return (
    <nav className='navbar'>
      <h1 className="navbar-brand">Placement Management System</h1>

      {user && (
        <div className="navbar-user">
          <AiOutlineUser />
          <span>{user.name || user.email}</span>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
