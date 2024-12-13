import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import './room-separate.scss';
import { urlApi } from "../../config/config";
import axios from 'axios';
import swal from "sweetalert";

const RoomSeparate = ({ roomData, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // Obtener reservas existentes
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${urlApi}/rooms/${roomData._id}`);
      const room = response.data;
      let reservasValue = room.unavailableDates.map(r => r);
      setReservations(reservasValue);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const checkAvailability = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!startDate || !endDate || isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Por favor selecciona fechas válidas.');
      return;
    }

    const unavailable = reservations.some(reservation => {
      const reservedStart = new Date(reservation.startDate);
      const reservedEnd = new Date(reservation.endDate);

      // Compara los rangos de fechas
      return (reservedStart < end && reservedEnd > start);
    });

    setIsAvailable(!unavailable);
    if (unavailable) {
      swal({
        title: "Fechas no disponibles, al parecer ya se ha reservado ese día",
        text: "Por favor selecciona otras fechas.",
        icon: "warning",
        button: "Aceptar",
      });
    } else {
      swal({
        title: "Fechas disponibles",
        text: "Puedes continuar con la reserva.",
        icon: "success",
        button: "Aceptar",
      });
    }
  };

  // Eliminar reserva
  const handleDeleteReservation = async (reservation) => {
    try {
      await axios.put(`${urlApi}/rooms/availability/delete/${roomData._id}`, {
        dates: reservation,
      });
      setReservations(reservations.filter((r) => r.startDate !== reservation.startDate || r.endDate !== reservation.endDate));
      swal({
        title: "Reserva eliminada",
        text: "La reserva ha sido eliminada correctamente.",
        icon: "success",
        button: "Aceptar",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const calculatePrice = () => {
    if (!startDate || !endDate) {
      alert('Por favor selecciona ambas fechas.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Fechas inválidas. Por favor selecciona fechas válidas.');
      return;
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days > 0) {
      setTotalPrice(days * roomData.price);
    } else {
      alert('La fecha de salida debe ser posterior a la fecha de entrada.');
    }
  };

  const handleReserveRoom = async (dates, room_id) => {
    try {
      const response = await axios.put(`${urlApi}/rooms/availability/${room_id}`, { dates });
      console.log("Reservation successful:", response.data);

      // Actualizar reservas locales
      setReservations([...reservations, ...dates]);

      onClose(); // Cerrar modal si está presente
      swal({
        title: "¡Reserva guardada correctamente!",
        text: "La reserva se ha hecho correctamente.",
        icon: "success",
        button: "Aceptar",
      });
    } catch (error) {
      console.error("Reservation error:", error);
      swal({
        title: "Error en la reserva",
        text: "No se pudo completar la reserva. Intenta de nuevo.",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  return (
    <Box className="room-separate">
      <Typography variant="h4" className="room-title">
        Reservar {roomData.title}
      </Typography>
      <Typography variant="body1" className="room-desc">
        {roomData.desc}
      </Typography>
      <Typography variant="body2" className="room-details">
        Capacidad máxima: {roomData.maxPeople} personas
      </Typography>
      <Typography variant="body2" className="room-details">
        Precio por noche: ${roomData.price}
      </Typography>
      <TextField
        label="Fecha de entrada"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="room-input"
      />
      <TextField
        label="Fecha de salida"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="room-input"
      />
      <Button
        variant="contained"
        onClick={checkAvailability}
        className="check-availability-button"
      >
        Verificar disponibilidad
      </Button>
      <Button
        variant="contained"
        onClick={calculatePrice}
        className="calculate-button"
      >
        Calcular precio
      </Button>
      {totalPrice > 0 && (
        <Typography variant="h6" className="total-price">
          Precio total: ${totalPrice}
        </Typography>
      )}
      {isAvailable && totalPrice > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleReserveRoom([{ startDate, endDate }], roomData._id)}
          className="reserve-button"
        >
          Reservar ahora
        </Button>
      )}
      <Typography variant="h5" className="reservations-title">
        Reservas existentes
      </Typography>
      <List>
        {reservations.map((reservation, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Desde: ${new Date(reservation.startDate).toLocaleDateString()} hasta: ${new Date(reservation.endDate).toLocaleDateString()}`} />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteReservation(reservation)}
            >
              Cancelar reserva
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RoomSeparate;
