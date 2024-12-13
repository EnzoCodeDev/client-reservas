import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { urlApi } from "../../config/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${urlApi}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="loginBox">
        <div className="avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <h2 className="title">Acceder</h2>
        <div className="inputContainer">
          <i className="fas fa-user inputIcon left user-icon"></i>
          <input
            placeholder="Usuario"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="inputContainer">
          <i className="fas fa-lock inputIcon left"></i>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Contraseña"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <i
            className={`fas fa-eye${isPasswordVisible ? "" : "-slash"} inputIcon right`}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          ></i>
        </div>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Iniciar sesión
        </button>
        {error && <span className="errorMessage">{error.message}</span>}
        <div className="registerOption">
          <span>¿Aún no estás registrado? </span>
          <button onClick={() => navigate("/register")} className="registerLink">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
