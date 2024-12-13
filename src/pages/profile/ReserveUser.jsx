export const getUserReservations = async (userId) => {
    const response = await fetch(`/api/reservations?userId=${userId}`);
    const data = await response.json();
    return data;
  };

export const createReservation = async (reservationData) => {
    
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
    const data = await response.json();
    return data;
  };
  