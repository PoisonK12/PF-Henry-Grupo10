import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import visitorIcon from "./constants";

async function geocodeAddress(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const result = data[0];
      return { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
    } else {
      throw new Error("No se encontraron resultados para la dirección proporcionada.");
    }
  } catch (error) {
    throw new Error("Error al geocodificar la dirección: " + error.message);
  }
}

const Maps = ({ location }) => {
  const initialAddress = location || "Buenos Aires, Argentina";
  const [coordinates, setCoordinates] = useState({ lat: 19.4326296, lng: -99.1331785 });
  const [address, setAddress] = useState(initialAddress);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCoordinates() {
      try {
        const coords = await geocodeAddress(address);
        setCoordinates({... coordinates, lat: coords.lat, lng: coords.lng });
        console.log("coodernadas", coords);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
  //  lat: 19.4326296
//lng: -99.1331785
getCoordinates()
    // if (typeof location === "object" && location.lat && location.lng) {
    //   // Si `location` ya es un objeto de coordenadas, úsalo directamente.
    //   setCoordinates(location);
    // } else if (address.trim() !== "") {
    //   getCoordinates();
   // }
  }, [address, coordinates]);

  return (
    <div>
  

      {error && <p>{error}</p>}
      <MapContainer
        center={coordinates}
        zoom={15}
        scrollWheelZoom
        style={{ height: "350px", width: "350px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.lat !== 0 && (
          <Marker position={coordinates} icon={visitorIcon}>
            <Popup>Estás aquí</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Maps;
