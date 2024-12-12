import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { urlApi } from "../../config/config";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryNames.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error al cargar la lista de países:", error);
      }
    };
    fetchCountries();
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Por favor introduzca un usuario.";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Por favor introduzca un correo válido.";
    if (!formData.country) newErrors.country = "Por favor seleccione un país.";
    if (!formData.city) newErrors.city = "Por favor introduzca una ciudad.";
    if (!formData.phone || !isValidPhoneNumber(formData.phone))
      newErrors.phone = "Número de celular inválido o incompleto.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: null,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${urlApi}/auth/register`, formData);
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setErrors({apiError: err.response?.data?.message || err.message || "Ocurrió un error inesperado.",});
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h2>Registro</h2>
        {errors.apiError && <span className="error">{errors.apiError}</span>}

        <input
          type="text"
          placeholder={errors.username || "Usuario"}
          id="username"
          value={formData.username}
          onChange={handleChange}
          className={`rInput ${errors.username ? "inputError" : ""}`}
        />
        <input
          type="password"
          placeholder={errors.password || "Contraseña"}
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={`rInput ${errors.password ? "inputError" : ""}`}
        />
        <input
          type="email"
          placeholder={errors.email || "Correo electrónico"}
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`rInput ${errors.email ? "inputError" : ""}`}
        />
        <select
          id="country"
          value={formData.country}
          onChange={handleChange}
          className={`rInput ${errors.country ? "inputError" : ""}`}
        >
          <option value="">{errors.country || "Seleccione un país"}</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder={errors.city || "Ciudad"}
          id="city"
          value={formData.city}
          onChange={handleChange}
          className={`rInput ${errors.city ? "inputError" : ""}`}
        />
        <PhoneInput
          international
          defaultCountry="US"
          value={formData.phone}
          onChange={handlePhoneChange}
          className={`rInput ${errors.phone ? "inputError" : ""}`}
          placeholder={errors.phone || "Celular"}
        />

        <button onClick={handleClick} className="rButton">
          Registrarse
        </button>
      </div>

      {successModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Registro exitoso</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
