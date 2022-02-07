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
        'x-rapidapi-key': '12ac9f1f4bmsh57b74cef1e2379bp10b656jsn67798c68287a'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const openopenWeatherData = async (lat, lng) => {
  try {
    // if (lat && lng){
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '12ac9f1f4bmsh57b74cef1e2379bp10b656jsn67798c68287a'
      }
    });
    return data;
  // }
  } catch (error) {
    console.log(error);
  }
}