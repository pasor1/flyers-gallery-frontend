import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary" style={{opacity:0.97}}>
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu" onClick={props.onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" component="h1" className={classes.title}>
            ShopFully
          </Typography>
          {/* <Button color="inherit">Categories</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;