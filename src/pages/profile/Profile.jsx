import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getUserReservations, createReservation } from "./ReserveUser";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    room: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (user) {
      getUserReservations(user.id).then((data) => {
        setReservations(data);
      });
    } else {
      navigate("/login"); 
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReservation.room && newReservation.date && newReservation.time) {
      createReservation(newReservation).then(() => {
        setReservations([...reservations, newReservation]);
        setNewReservation({ room: "", date: "", time: "" });
      });
    }
  };

  return (
    <div className="profileContainer">
      <h1>Perfil de {user.username}</h1>

      <div className="reservations">
        <h2>Mis Reservas</h2>
        <ul>
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <li key={index}>
                <p>Sala: {reservation.room}</p>
                <p>Fecha: {reservation.date}</p>
                <p>Hora: {reservation.time}</p>
              </li>
            ))
          ) : (
            <p>No tienes reservas.</p>
          )}
        </ul>
      </div>

      <div className="newReservation">
        <h2>Hacer Nueva Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Sala:</label>
            <input
              type="text"
              value={newReservation.room}
              onChange={(e) => setNewReservation({ ...newReservation, room: e.target.value })}
            />
          </div>
          <div>
            <label>Fecha:</label>
            <input
              type="date"
              value={newReservation.date}
              onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
            />
          </div>
          <div>
            <label>Hora:</label>
            <input
              type="time"
              value={newReservation.time}
              onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
            />
          </div>
          <button type="submit">Reservar</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
