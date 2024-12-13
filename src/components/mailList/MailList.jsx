import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';  
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

    const { name, email, phone } = formData;
    
    // Formato del mensaje
    const message = `
      Nombre: ${name}
      Correo: ${email}
      Teléfono: ${phone}
    `;

    // Crear un enlace mailto para enviar el correo
    const mailtoLink = `mailto:miguelangelr109ur@gmail.com?subject=Formulario de contacto&body=${encodeURIComponent(message)}`;
    
    // Redirigir al enlace mailto
    window.location.href = mailtoLink;

    // Mostrar el mensaje de éxito con SweetAlert
    Swal.fire({
      title: '¡Formulario Enviado!',
      text: 'Se abrirá tu cliente de correo para enviar el mensaje.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0071c2',
      background: '#f4f4f4',
    });

    // Limpiar los campos
    setFormData({ name: "", email: "", phone: "" });
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
        <button type="submit" className="submitButton">Enviar</button>
      </form>
    </div>
  );
};

export default MailList;

