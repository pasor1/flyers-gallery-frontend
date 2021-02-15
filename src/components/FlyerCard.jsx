import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles({
  root: {
    width: 160,
    height: 240
  },
  media: {
    height: 110,
    backgroundColor: '#eee'
  },
  caption: {
    height: 84,
    padding: '0 10px'
  },
  footer: {
    padding: '0',
    justifyContent: 'flex-end'
  },
});

const FlyerCard = (props) => {
  const classes = useStyles();

  const cardContent = props.loading === false ? 
    <>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://picsum.photos/seed/${props.id}/160/110`}
          title={`${props.retailer} - ${props.title}`}
        />
        <CardContent className={classes.caption}>
          <Typography variant="overline" component="p">
            {props.retailer}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.footer}>
          {props.favourite
            ? (<IconButton aria-label="Remove from favourites" color="secondary" onClick={props.clickRemove}><FavoriteIcon/></IconButton>)
            : (<IconButton aria-label="Add to favourites" color="default" onClick={props.clickAdd}><FavoriteIconBorder/></IconButton>)
          }
      </CardActions>
    </>
    :
    <>
      <Skeleton variant="rect" width={160} height={110} />
      <div className={classes.caption}>
        <Skeleton height={18} width={90} />
        <Skeleton height={18} width={140} />
        <Skeleton height={18} width={60} />
        <Skeleton height={18} width={110} />
      </div>
      <CardActions className={classes.footer}>
        <IconButton aria-label="Loding..."><FavoriteIconBorder color="disabled"/></IconButton>
      </CardActions>
    </>

  return (
    <Card className={classes.root}>
      <LazyLoad offset={600}>
        {cardContent}
      </LazyLoad>
    </Card>         
  )
};

export default FlyerCard;