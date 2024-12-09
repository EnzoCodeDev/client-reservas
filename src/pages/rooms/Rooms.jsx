import './rooms.scss';
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export const Rooms = () => {
    let { id_hotel } = useParams();
    const { data, loading, error } = useFetch(`/rooms/byHotel/${id_hotel}`);

    useEffect(() => {
        // Aquí puedes hacer algo cuando 'data' cambie si es necesario
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
        </div>
    );
};
