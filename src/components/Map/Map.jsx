import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';
import mapStyles from './mapStyles';
// import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlinedIcon';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, openWeatherData }) => {
  const styles = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');

  return (
    <div className = {styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys = {{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter = {coordinates}
        center = {coordinates}
        defaultZoom = {14}
        margin = {[50, 50, 50, 50]}
        options = {{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange = {(event) => {
          console.log(event);
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick = {(child) => {setChildClicked(child)}}
      >
      
      {places?.map((place, i) => (
        <div
          className={styles.markerContainer}
          lat={place.latitude}
          lng={place.longitude}
          key={i}
        >
          {
            !isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large"/>
            ) : (
              <Paper elevation={3} className={styles.paper}>
                <Typography className={styles.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>

                <img
                className={styles.pointer}
                src={ place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>
            )
          }
        </div>
      ))}

      {openWeatherData?.list?.map((data, i) => (
        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
          <img height={75} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
        </div>
      ))}

      </GoogleMapReact>   
    </div>
  );
};

export default Map;