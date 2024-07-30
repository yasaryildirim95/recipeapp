import "./header.css";
import { useUserPreferences } from "../context/UserPreferencesContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { toggleTheme } = useUserPreferences();
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="logo">Recipe Platform</div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipe List</Link>
          </li>
          <li>
            <Link to="/new">Add Recipe</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <a onClick={isAuthenticated ? handleLogout : handleLogin}>
              {isAuthenticated ? "Logout" : "Login"}
            </a>
          </li>
          <li>
            <div className="switch-container">
              <input type="checkbox" id="switch" className="switch-checkbox" />
              <label
                htmlFor="switch"
                className="switch-label"
                onClick={toggleTheme}
              ></label>
              <div className="switch-handle"></div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
