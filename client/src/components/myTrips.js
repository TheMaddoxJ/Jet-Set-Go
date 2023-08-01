import React, { useState } from "react";

const MyTrips = () => {
  const [destination, setDestination] = useState("");
  const [hotel, setHotel] = useState("");
  const [flight, setFlight] = useState("");
  const [myTrips, setMyTrips] = useState([]);

  const handleAddTrip = () => {
    // Check if all fields are filled before adding the trip
    if (destination && hotel && flight) {
      setMyTrips((prevTrips) => [...prevTrips, { destination, hotel, flight }]);
      setDestination("");
      setHotel("");
      setFlight("");
    }
  };

  return (
    <div>
      <h2>My Trips</h2>
      {/* Input fields for user to add trip details */}
      <div>
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      /* */
      <div>
        <label htmlFor="hotel">Hotel</label> 
        <input
          type="text"
          id="hotel"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="flight">Flight</label>
        <input
          type="text"
          id="flight"
          value={flight}
          onChange={(e) => setFlight(e.target.value)}
        />
      </div>
      <button onClick={handleAddTrip}>Add Trip</button>

      {/* Display the list of user trips */}
      <div>
        <h3>Your Trips</h3>
        {myTrips.length === 0 ? (
          <p>No trips added yet.</p>
        ) : (
          <ul>
            {myTrips.map((trip, index) => (
              <li key={index}>
                <strong>Destination:</strong> {trip.destination},{" "}
                <strong>Hotel:</strong> {trip.hotel}, <strong>Flight:</strong>{" "}
                {trip.flight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
