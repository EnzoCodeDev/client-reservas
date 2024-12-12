import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import './room-separate.scss';
import { urlApi } from "../../config/config";
import axios from 'axios'; // for making API requests

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="success-modal">
        <h2>¡Reserva realizada con éxito!</h2>
        <p>Su habitación está reservada para las fechas seleccionadas.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    )
  );
};

const handleReserveRoom = async (dates, room_id) => {
  try {
    const response = await axios.put(`${urlApi}/rooms/availability/${room_id}`, { dates });
    console.log("Reservation successful:", response.data);
    
    setIsSuccessModalOpen(true);
  } catch (error) {
    console.error("Reservation error:", error);
    // Handle reservation error (e.g., show error message)
  }
};

const RoomSeparate = ({ roomData, onClose }) => {
  // Datos simulados de la habitación (puedes reemplazarlos con datos reales más adelante)
  // const roomData = {
  //   title: 'Habitación Deluxe',
  //   price: 100, // Precio por noche
  //   maxPeople: 3,
  //   desc: 'Habitación espaciosa y bien equipada con vista al mar.',
  //   roomNumbers: [{ number: 101, unavailableDates: ['2024-12-20', '2024-12-25'] }],
  // };
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

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
          onClick={() => handleReserveRoom([startDate, endDate], roomData._id)}
          className="reserve-button"
        >
          Reservar ahora
        </Button>
      )}
    </Box>
  );
};

export default RoomSeparate;
