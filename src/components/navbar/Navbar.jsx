import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9140/9140319.png"
              alt="Logo"
            />
            Meetinghub
          </span>
        </Link>
        {user ? (
          <div className="navItems">
            <div className="userMenu">
              <span className="userName" onClick={toggleDropdown}>Hola, {user.username}</span>
              {dropdownOpen && (
                <div className="dropdownMenu">
                  <button className="dropdownItem" onClick={() => navigate("/profile")}>Perfil</button>
                  <button className="dropdownItem" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButtonR" onClick={() => navigate("/register")}>Registrarse</button>
            <button className="navButtonI" onClick={() => navigate("/login")}>Iniciar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;