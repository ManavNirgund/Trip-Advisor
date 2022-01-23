import axios from 'axios';

export const travelAdvisorData = async (type, sw, ne) => {  
  try {    
    const {data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'b464f21bf1msh8f38ed369afc4cap185361jsna7227da11f60'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const openWeatherData = async ({ lat, lng }) => {

  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'b464f21bf1msh8f38ed369afc4cap185361jsna7227da11f60'
      }
    });
    
    return data;
  } catch (error) {
    console.log(error);
  }
}