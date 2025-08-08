import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYWJkdWxsYWgyMi0yMiIsImEiOiJjbWUybXpuZDcwazQ1MmpzYTBzdWYwZ2ZzIn0.wW1je6mRQw6d8QipgNio2g";

export const fetchCityCoordinates = async (searchQuery) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`,
    {
      params: { access_token: MAPBOX_ACCESS_TOKEN },
    }
  );
  return response.data.features[0];
};

export const fetchHotelsByCity = async (searchQuery) => {
  const response = await axios.get('http://localhost:5000/api/hotels/map', {
    params: { query: searchQuery },
  });
  return response.data;
};
