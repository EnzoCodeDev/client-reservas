import './rooms.scss';
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import RoomSeparate from '../room-separate/room-separate'; // Import the RoomSeparate component
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const Rooms = () => {
    let { id_hotel } = useParams();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { data, loading, error } = useFetch(`/rooms/byHotel/${id_hotel}`);

    // Use a single state variable to control the modal visibility
    const [open, setOpen] = useState(false);

    const handleReserveClick = (room) => {
        setSelectedRoom(room); // Set the selected room data on button click
        setOpen(true); // Open the modal when a room is selected
    };

    const handleModalClose = () => {
        setSelectedRoom(null); // Clear selected room data on modal close
        setOpen(false); // Close the modal
    };

    useEffect(() => {
        // ... (Aquí puedes hacer algo cuando 'data' cambie si es necesario)
    }, [data]);

    return (
        <div className="rooms-container">
            <Navbar />
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : error ? (
                <p className="error">Ocurrió un error al cargar los datos.</p>
            ) : (
                <div className="hotel-details">
                    {data.hotel ? (
                        <div>
                            <div className="hotel-info">
                                <h1 className="hotel-name">{data.hotel.name}</h1>
                                <p className="hotel-location">{data.hotel.city}</p>
                                <p className="hotel-description">{data.hotel.desc}</p>
                                <div className="hotel-price">Precio desde: ${data.hotel.cheapestPrice}</div>
                            </div>
                            <div className="rooms-list">
                                {data.rooms.length > 0 ? (
                                    data.rooms.map((room) => (
                                        <div className="room-card" key={room._id}>
                                            <h2 className="room-title">{room.title}</h2>
                                            <p className="room-desc">{room.desc}</p>
                                            <p className="room-price">Precio: ${room.price} por noche</p>
                                            <p className="room-capacity">Capacidad: {room.maxPeople} personas</p>
                                            <div className="room-numbers">
                                                <h3>Habitaciones disponibles</h3>
                                                {room.roomNumbers.map((number) => (
                                                    <div key={number._id} className="room-number">
                                                        <p>Número: {number.number}</p>
                                                        <p>{number.unavailableDates.length > 0 ? 'No disponible' : 'Disponible'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => handleReserveClick(room)}>Reserva</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay habitaciones disponibles.</p>
                                )}
                            </div>
                        </div>

                    ) : (
                        <div>
                        </div>
                    )}
                </div>
            )}
            {selectedRoom && (
                <Dialog fullScreen={true} open={open} onClose={handleModalClose}>
                    <DialogContent className="dialog-content">
                        <div>
                        <RoomSeparate roomData={selectedRoom} onClose={handleModalClose} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleModalClose}
                        className="cancel-button"
                        >
                            SALIR
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};
