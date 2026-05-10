import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corectare pentru iconițele default de la Leaflet în React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordonate mock (ex: Chișinău)
const centerPosition: [number, number] = [47.0105, 28.8638];

const mockLocations = [
  { id: 1, lat: 47.015, lng: 28.850, title: 'Brutăria Cuptor', status: 'urgent' },
  { id: 2, lat: 47.005, lng: 28.870, title: 'Piața Centrală', status: 'active' },
  { id: 3, lat: 47.020, lng: 28.860, title: 'Restaurant Tradițional', status: 'urgent' },
];

const LiveMap: React.FC = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden z-0 relative">
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mockLocations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="font-bold text-gray-900">{loc.title}</div>
              <div className={`text-xs mt-1 font-semibold ${loc.status === 'urgent' ? 'text-amber-600' : 'text-blue-600'}`}>
                {loc.status === 'urgent' ? 'Donație Urgentă' : 'Rezervare Activă'}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;