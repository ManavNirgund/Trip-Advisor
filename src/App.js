import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { travelAdvisorData, openopenWeatherData } from './api'

const App = () => {

  const [rating, setRating] = useState('')
  const [type, setType] = useState('restaurants');
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [openWeatherData, setOpenWeatherData] = useState([]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces);
  }, [rating])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {

    if(bounds.sw && bounds.ne) {
    setIsLoading(true);

    openopenWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => setOpenWeatherData(data));


    travelAdvisorData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      })
    }
  }, [type, bounds]);

  console.log(places);
  console.log(filteredPlaces);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
            places = { filteredPlaces.length ? filteredPlaces : places }
            childClicked = { childClicked }
            isLoading = { isLoading }
            type = { type }
            setType = { setType }
            rating = { rating }
            setRating = { setRating }
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map 
            setCoordinates = {setCoordinates}
            setBounds = {setBounds}
            coordinates = {coordinates}
            places={ filteredPlaces.length ? filteredPlaces : places }
            setChildClicked = {setChildClicked}
            openWeatherData = { openWeatherData }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;