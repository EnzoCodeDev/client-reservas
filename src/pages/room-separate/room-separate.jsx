import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import './room-separate.scss';

const RoomSeparate = ({ title, price, maxPeople, desc }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * price);
      } else {
        setTotalPrice(0);
        alert('La fecha de fin debe ser posterior a la fecha de inicio');
      }
    }
  };

  return (
    <Box className="room-separate">
      <Typography variant="h4" className="room-title">
        {title}
      </Typography>
      <Typography variant="body1" className="room-desc">
        {desc}
      </Typography>
      <Typography variant="body2" className="room-details">
        Máximo de personas: {maxPeople}
      </Typography>
      <TextField
        label="Fecha de inicio"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="room-input"
      />
      <TextField
        label="Fecha de fin"
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
    </Box>
  );
};

export default RoomSeparate;
