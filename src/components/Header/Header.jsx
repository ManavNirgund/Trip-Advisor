import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';

const Header = ({ setCoordinates }) => {
  const styles = useStyles();
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoComplete) => setAutoComplete(autoComplete);
  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  }

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h5" className={styles.title}>
          Trip Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={styles.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={styles.search}>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: styles.inputRoot, input: styles.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;