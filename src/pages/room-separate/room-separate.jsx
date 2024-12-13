import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
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

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${urlApi}/rooms/${roomData._id}`);
      const room = response.data;
      setReservations(room.unavailableDates.map(r => r));
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
      swal({
        title: "Fechas inválidas",
        text: "Por favor selecciona fechas válidas.",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const unavailable = reservations.some(reservation => {
      const reservedStart = new Date(reservation.startDate);
      const reservedEnd = new Date(reservation.endDate);
      return reservedStart < end && reservedEnd > start;
    });

    setIsAvailable(!unavailable);
    swal({
      title: unavailable ? "Fechas no disponibles" : "Fechas disponibles",
      text: unavailable ? "Por favor selecciona otras fechas." : "Puedes continuar con la reserva.",
      icon: unavailable ? "warning" : "success",
      button: "Aceptar",
    });
  };

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
      swal({
        title: "Fechas faltantes",
        text: "Por favor selecciona ambas fechas.",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      swal({
        title: "Fechas inválidas",
        text: "Por favor selecciona fechas válidas.",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days > 0) {
      setTotalPrice(days * roomData.price);
    } else {
      swal({
        title: "Error en las fechas",
        text: "La fecha de salida debe ser posterior a la fecha de entrada.",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const handleReserveRoom = async (dates, room_id) => {
    try {
      await axios.put(`${urlApi}/rooms/availability/${room_id}`, { dates });
      setReservations([...reservations, ...dates]);
      onClose();
      swal({
        title: "¡Reserva exitosa!",
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
        Reserva {roomData.title}
      </Typography>
      <Box className="room-info">
        <Typography variant="body1" className="room-desc">
          {roomData.desc}
        </Typography>
        <Typography variant="body2" className="room-details">
          Capacidad máxima: {roomData.maxPeople} personas
        </Typography>
        <Typography variant="body2" className="room-details">
          Precio por noche: ${roomData.price}
        </Typography>
      </Box>
      <Box className="date-pickers">
        <TextField
          label="Fecha de entrada"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
        <TextField
          label="Fecha de salida"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </Box>
      <Box className="action-buttons">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={checkAvailability}
          className="action-button"
        >
          Verificar disponibilidad
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={calculatePrice}
          disabled={!isAvailable}
          className="action-button"
        >
          Calcular precio
        </Button>
      </Box>
      {totalPrice > 0 && (
        <Typography variant="h6" className="total-price">
          Precio total: ${totalPrice}
        </Typography>
      )}
      {isAvailable && totalPrice > 0 && (
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => handleReserveRoom([{ startDate, endDate }], roomData._id)}
          className="action-button"
        >
          Reservar ahora
        </Button>
      )}
      <Typography variant="h5" className="reservations-title">
        Reservas existentes
      </Typography>
      <List>
        {reservations.map((reservation, index) => (
          <ListItem key={index} className="reservation-item">
            <ListItemText
              primary={`Desde: ${new Date(reservation.startDate).toLocaleDateString()} hasta: ${new Date(reservation.endDate).toLocaleDateString()}`}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDeleteReservation(reservation)}
              className="cancel-button"
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
