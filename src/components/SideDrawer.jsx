import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  drawerContainer: {
    width: 280,
  },
  backButton: {
    textAlign: 'right',
    padding: '8px',
  },
  drawerHeader: {
    padding: '20px'
  },
  emptyContainer: {
    padding: '50px 20px',
    textAlign: 'center'
  }
});

const SideDrawer = (props) => {
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={props.drawerStatus} onClose={props.toggleDrawler}>
      <div className={classes.drawerContainer}>
        <div className={classes.backButton} onClick={props.toggleDrawler}>
        <IconButton aria-label="close" color="primary">
          <ArrowBackIos />
        </IconButton>
        </div>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" className={classes.title}>
            Favourites
          </Typography>
          The list of your preferred flyers
        </div>
        <Divider />
        {props.favourites.length ? (
          <List>
            {props.favourites.map((favourite) => (
              <ListItem button key={favourite.id}>
                <ListItemIcon><FavoriteIcon color="secondary" /></ListItemIcon>
                <ListItemText
                  primary={favourite.title}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondary={`Expires on ${favourite.end_date.split('-').reverse().join('/')}`}
                  secondaryTypographyProps={{ variant: 'caption' }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Remove from favourites" onClick={() => props.clickRemove(favourite)}>
                    <DeleteIcon color="disabled" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List> 
        ) : (
            <div className={classes.emptyContainer}>
              <FavoriteIconBorder color="disabled"/><br/> Your favourites list is empty
            </div>
          )
        }
        
        <Divider />
      </div>
    </Drawer>
  )
}

export default SideDrawer;