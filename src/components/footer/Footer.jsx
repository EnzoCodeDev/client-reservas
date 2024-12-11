import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Cómo funciona</li>
          <li className="fListItem">Salas de reuniones</li>
          <li className="fListItem">Ajustes de reserva</li>
          <li className="fListItem">Precios y opciones</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Nosotros</li>
          <li className="fListItem">Nuestro equipo</li>
          <li className="fListItem">Innovación en espacios</li>
          <li className="fListItem">Responsabilidad social</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Blog</li>
          <li className="fListItem">Casos de éxito</li>
          <li className="fListItem">Artículos sobre reuniones</li>
          <li className="fListItem">Consejos y mejores prácticas</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Servicios adicionales</li>
          <li className="fListItem">Catering</li>
          <li className="fListItem">Equipos de conferencia</li>
          <li className="fListItem">Soporte técnico</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Contacto</li>
          <li className="fListItem">Atención al cliente</li>
          <li className="fListItem">Soporte para empresas</li>
          <li className="fListItem">Sostenibilidad</li>
        </ul>
      </div>
      <div className="fText">
        Copyright © 2024 Meetinghub. Todos los derechos reservados. 
        <br />
        <span>Tu lugar ideal para reuniones efectivas.</span>
      </div>
    </div>
  );
};

export default Footer;

