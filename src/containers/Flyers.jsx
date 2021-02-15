import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FlyerCard from '../components/FlyerCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import axios from '../axiosConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  errorDialogContent: {
    display: 'flex',
    padding: '40px 20px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const flyersInitState = () => {
  let flyers = [];
  for (let index = 0; index < 48; index++) {
    flyers.push({id: index});
  }
  return flyers;
}

const Flyers = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flyers, setflyers] = useState(flyersInitState);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getFlyers();
    getStoredFavotites();
  }, [])

  useEffect(() => {
    storeFavourites(favourites);
  }, [favourites])

  const getFlyers = () => {
    axios.get('api/flyers?page=1&limit=100')
      .then(response => {
        //console.log(response.data);
        setflyers(response.data);
        setLoading(false);
      })
      .catch(error => {
        //console.log(error)
        setError(true);
      })
  }

  const isFavourite = (flyer) => {
    return favourites.some(favourite => JSON.stringify(favourite) === JSON.stringify(flyer))
  }

  const storeFavourites = (favourites) => {
    const favouritesString = JSON.stringify(favourites); 
    if (localStorage) {
      localStorage.favourites = favouritesString;
    } else {
      document.cookie = `favourites=${favouritesString}`;
      document.cookie = `test=${favouritesString}`;
    }
  }

  const getStoredFavotites = () => {
    if (localStorage) {
      localStorage.favourites && localStorage.favourites.length && setFavourites(JSON.parse(localStorage.favourites));
    } else {
      let favoritesFromCookie = [];
      const cookieName = 'favourites=';
      const cookieArray = document.cookie.split(';');
      for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(cookieName) === 0) {
          favoritesFromCookie = cookie.substring(cookieName.length, cookie.length);
        }
      }
      favoritesFromCookie && localStorage.favourites.length && setFavourites(JSON.parse(favoritesFromCookie));
    }
  }

  const addFavouriteHandler = (flyer) => {
    setFavourites([...favourites, flyer]);
  }

  const removeFavouriteHandler = (flyer) => {
    let updatedFavourites = favourites.filter(favourite => JSON.stringify(favourite) !== JSON.stringify(flyer));
    setFavourites(updatedFavourites);
  }

  return (
    <Layout favourites={favourites} clickRemove={removeFavouriteHandler}>
      {
        !error ||
          <Dialog aria-labelledby="Error" open={true} onClose={() => setError(false)}>
          <Typography variant="h6" className={classes.errorDialogContent}>
            <ErrorOutlineIcon style={{ fontSize: 100, color: '#999', marginRight:20}}/>
            Sorry, your device is offline ...
          </Typography>
          </Dialog>
      }   
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2} item md={12}>
            {flyers.map(flyer => (
              <Grid item key={flyer.id}>
                <FlyerCard
                  {...flyer}
                  loading={loading}
                  favourite={isFavourite(flyer)}
                  clickAdd={() => addFavouriteHandler(flyer)}
                  clickRemove={() => removeFavouriteHandler(flyer)}/>
              </Grid>
            ))}
          </Grid>
        </Grid>  
      </Grid>  
    </Layout>
  )
};

export default Flyers;