import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

// Fix default marker icon in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Coords {
  lat: number;
  lng: number;
  address: string;
}

interface LocationPickerProps {
  value?: Coords | null;
  onChange: (coords: Coords | null) => void;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [reverseGeocoding, setReverseGeocoding] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const center: [number, number] = value ? [value.lat, value.lng] : [47.0, 28.8];

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data: NominatimResult[] = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const selectResult = (r: NominatimResult) => {
    onChange({ lat: parseFloat(r.lat), lng: parseFloat(r.lon), address: r.display_name });
    setQuery(r.display_name);
    setResults([]);
  };

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setReverseGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      onChange({ lat, lng, address });
      setQuery(address);
    } catch {
      onChange({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
    } finally {
      setReverseGeocoding(false);
    }
  }, [onChange]);

  return (
    <div className="space-y-3">
      {/* Search box */}
      <div className="relative">
        <div className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${
          isDark
            ? 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-100'
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <MagnifyingGlassIcon className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an address..."
            className="flex-1 bg-transparent outline-none text-sm font-medium placeholder-gray-400"
          />
          {(searching || reverseGeocoding) && (
            <div className="w-4 h-4 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin flex-shrink-0" />
          )}
          {value && (
            <button
              type="button"
              onClick={() => { onChange(null); setQuery(''); setResults([]); }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        {results.length > 0 && (
          <div className={`absolute z-[9999] w-full mt-1 rounded-xl border shadow-xl overflow-hidden ${
            isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-200'
          }`}>
            {results.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectResult(r)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-start gap-2 transition-colors ${
                  isDark
                    ? 'hover:bg-[#222] text-gray-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <MapPinIcon className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{r.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-[#2e2e2e]">
        <MapContainer
          center={center}
          zoom={value ? 14 : 7}
          style={{ height: '100%', width: '100%' }}
          key={value ? `${value.lat},${value.lng}` : 'default'}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapClickHandler onMapClick={handleMapClick} />
          {value && <Marker position={[value.lat, value.lng]} />}
        </MapContainer>
      </div>

      {value && (
        <p className={`text-xs flex items-start gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <MapPinIcon className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{value.address}</span>
        </p>
      )}
      {!value && (
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Search or click on the map to set a pickup location.
        </p>
      )}
    </div>
  );
};

export default LocationPicker;
