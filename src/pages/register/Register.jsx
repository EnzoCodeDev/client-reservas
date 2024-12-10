import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { urlApi } from "../../config/config";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

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
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Por favor introduzca un usuario.";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Por favor introduzca un correo valido.";
    if (!formData.country) newErrors.country = "Por favor introduzca un pais.";
    if (!formData.city) newErrors.city = "Por favor introduzca una ciudad.";

    if (!formData.phone || !isValidPhoneNumber(formData.phone))
      newErrors.phone = "Número de teléfono inválido o incompleto";
    else if (formData.phone.length > 15)
      newErrors.phone = "El número de teléfono debe tener máximo 15 dígitos";

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
      setErrors({ apiError: err.response?.data?.message || "Ocurrió un error." });
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
        <input
          type="text"
          placeholder={errors.country || "País"}
          id="country"
          value={formData.country}
          onChange={handleChange}
          className={`rInput ${errors.country ? "inputError" : ""}`}
        />
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
          placeholder={errors.phone || "Teléfono"}
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
