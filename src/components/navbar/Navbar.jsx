import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <span className="logo">
  <img src="https://cdn-icons-png.flaticon.com/512/9140/9140319.png" alt="Logo" />
  Meetinghub
</span>

        </Link>
        {user ? user.username : (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate('/login')}>Iniciar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
