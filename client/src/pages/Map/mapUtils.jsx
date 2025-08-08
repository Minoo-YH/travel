import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = "pk.eyJ1IjoiYWJkdWxsYWgyMi0yMiIsImEiOiJjbWUybXpuZDcwazQ1MmpzYTBzdWYwZ2ZzIn0.wW1je6mRQw6d8QipgNio2g";

export const initializeMap = (container) => {
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [24.92220464661415, 60.16032749891157], 
    zoom: 10,
    interactive: true,
  });

  return map;
};

export const flyToLocation = (map, coordinates) => {
  map.flyTo({
    center: coordinates,
    zoom: 12,
    essential: true,
  });
};
