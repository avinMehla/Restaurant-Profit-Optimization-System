import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>Restaurant Optimizer</h2>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/menu-performance">
          Menu Performance
        </Link>

        <Link to="/recommendations">
          Recommendations
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;