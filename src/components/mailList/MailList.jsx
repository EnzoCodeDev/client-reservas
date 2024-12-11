import { useState } from "react";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./mailList.css";

const MailList = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado con éxito");
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Contáctanos</h1>
      <span className="mailDesc">
        Rellena los campos a continuación y nos pondremos en contacto contigo.
      </span>
      <form className="mailForm" onSubmit={handleSubmit}>
        <div className="mailInputContainer">
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mailInputContainer">
          <input
            type="email"
            name="email"
            placeholder="Tu Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Introduce un correo electrónico válido"
          />
        </div>
        <div className="mailInputContainer">
          <div className="phoneInput">
            <PhoneInput
              international
              defaultCountry="CO" 
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Tu Número Telefónico"
              required
            />
          </div>
        </div>
        <button className="submitButton">Enviar</button>
      </form>
    </div>
  );
};

export default MailList;
