import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const styles = useStyles();
  const [reference, setReference] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => reference[i] || createRef());

    setReference(refs);
  }, [places]);

  return (
    <div className={styles.container}>
      <Typography variant="h4">Restaurants, Hotels and many more!</Typography>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={styles.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="restaurants"> Restaurants </MenuItem>
              <MenuItem value="hotels"> Hotels </MenuItem>
              <MenuItem value="attractions"> Attractions </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <MenuItem value="0"> All </MenuItem>
              <MenuItem value="3"> Above 3.0 </MenuItem>
              <MenuItem value="4"> Above 4.0 </MenuItem>
              <MenuItem value="4.5"> Above 4.5 </MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={styles.list}>
            {places?.map((place, i) => (
              <Grid ref={reference[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={reference[i]}
                ></PlaceDetails>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
