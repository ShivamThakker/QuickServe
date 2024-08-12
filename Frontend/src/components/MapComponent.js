import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Define custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = ({ cities }) => {
  return (
    <MapContainer 
      center={[44.0, -71.0]} 
      zoom={6} 
      className="map-container"
      style={{ padding: 0, margin: 0, border: 'none' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.keys(cities).map(state => (
        cities[state].map(city => (
          <Marker
            key={city.name}
            position={[city.lat, city.lng]} // Ensure cities have lat and lng properties
            icon={customIcon}
          >
            <Popup>{city.name}</Popup>
          </Marker>
        ))
      ))}
    </MapContainer>
  );
};

export default MapComponent;
