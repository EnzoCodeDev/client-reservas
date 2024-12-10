import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { urlApi } from "../../config/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

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
          <i className="user"></i>
        </div>
        <h2 className="title">Acceder</h2>
        <div className="inputContainer">
          <i className="fas fa-user inputIcon"></i>
          <input
            type="text"
            placeholder="Usuario"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="inputContainer">
          <i className="fas fa-lock inputIcon"></i>
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Iniciar sesión
        </button>
        {error && <span className="errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
