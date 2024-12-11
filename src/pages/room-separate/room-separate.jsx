import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import './room-separate.scss';

const RoomSeparate = () => {
  // Datos simulados de la habitación (puedes reemplazarlos con datos reales más adelante)
  const roomData = {
    title: 'Habitación Deluxe',
    price: 100, // Precio por noche
    maxPeople: 3,
    desc: 'Habitación espaciosa y bien equipada con vista al mar.',
    roomNumbers: [{ number: 101, unavailableDates: ['2024-12-20', '2024-12-25'] }],
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calcula la diferencia en días
      if (days > 0) {
        setTotalPrice(days * roomData.price);
      } else {
        alert('La fecha de salida debe ser posterior a la fecha de entrada.');
      }
    } else {
      alert('Por favor selecciona ambas fechas.');
    }
  };

  const handleReserve = () => {
    alert(`Reserva confirmada para la habitación "${roomData.title}" por ${totalPrice} USD.`);
    // Aquí puedes simular una solicitud POST a tu API para procesar la reserva
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
      {totalPrice > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={handleReserve}
          className="reserve-button"
        >
          Reservar ahora
        </Button>
      )}
    </Box>
  );
};

export default RoomSeparate;
