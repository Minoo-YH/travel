import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { fetchCityCoordinates, fetchHotelsByCity } from './Search';
import { initializeMap, flyToLocation } from './mapUtils';
import Nav from "@Nav";
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import "./mmap.css" 

const Map = () => {
  const theme = useTheme();
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mapInstance = initializeMap(mapContainerRef.current);
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a city or country name!');
      return;
    }

    setLoading(true);
    setHotels([]);

    try {
      const cityData = await fetchCityCoordinates(searchQuery);
      if (cityData) {
        const [longitude, latitude] = cityData.geometry.coordinates;

        const cityMarker = new mapboxgl.Marker({ anchor: 'center' })
          .setLngLat([longitude, latitude])
          .addTo(map);

        cityMarker.getElement().style.pointerEvents = 'none';
        flyToLocation(map, [longitude, latitude]);
      }

      const hotelsData = await fetchHotelsByCity(searchQuery);
      setHotels(hotelsData);

      if (hotelsData.length === 0) {
        alert('No hotels found in this location.');
      } else {
        hotelsData.forEach((hotel) => {
          if (hotel.latitude && hotel.longitude) {
            const hotelMarker = new mapboxgl.Marker({ anchor: 'center' })
              .setLngLat([hotel.longitude, hotel.latitude])
              .addTo(map);

            hotelMarker.getElement().style.pointerEvents = 'none';
          }
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
      }}>
        {/* Left Sidebar with search and hotel list */}
        <Box sx={{
          width: { xs: '100%', md: '350px' },
          padding: '20px',
          overflowY: 'auto',
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f8f9fa',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>

          <TextField
          
            label="Search by city or country"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              marginBottom: '10px',
              input: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#fff',
                borderRadius: '5px',
              },
            }}
          />
          <Button onClick={handleSearch}  className='nav-buttonmap ' variant="contained" color="primary" fullWidth>
            Search
          </Button>

          {loading && (
            <Typography variant="h6" color="primary" sx={{ marginTop: '20px' }}>
              Searching...
            </Typography>
          )}

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Hotels in {searchQuery}
            </Typography>

            {hotels.length === 0 ? (
              <Typography>No hotels found in this city.</Typography>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {hotels.map((hotel) => (
                  <Box
                    key={hotel._id}
                    className="hotel-card"
                  >
                    <img
                      src={`http://localhost:5000/${hotel.photos?.[0]?.replace(/\\/g, '/') || 'default-image.jpg'}`}
                      alt={hotel.name}
                      className="hotel-image"
                    />
                    <Typography variant="h6">{hotel.name}</Typography>
                    <Typography><strong>Country:</strong> {hotel.country}</Typography>
                    <Typography><strong>City:</strong> {hotel.city}</Typography>
                    <Typography><strong>Address:</strong> {hotel.address}</Typography>
                    <Typography><strong>Cheapest Price:</strong> ${hotel.cheapestPrice}</Typography>
                    <Typography><strong>Max Price:</strong> ${hotel.maxPrice}</Typography>
                    <Typography><strong>Phone Number:</strong> {hotel.phoneNumber}</Typography>

                    <Link to={`/hotels/${hotel._id}/rooms`} className="hotel-link">
                      Go to Rooms
                    </Link>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Right side with map */}
        <Box sx={{ flexGrow: 1, height: '100%' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
    </div>
  );
};

export default Map;
