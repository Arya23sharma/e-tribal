import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);
  const { item, addItem, removeItem } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const BootstrapTooltip = (props) => {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  };

  const handleAddItem = () => {
    addItem(item);
    enqueueSnackbar(item.title + ' Added Sucessfully', {
      variant: 'success',
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            {removeItem ? (
              <BootstrapTooltip title='Remove from Cart' placement='bottom'>
                <IconButton
                  onClick={() => removeItem(item)}
                  color='primary'
                  aria-label='remove from shopping cart'
                >
                  <StyledBadge badgeContent={item.count} color='secondary'>
                    <RemoveShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </BootstrapTooltip>
            ) : (
              <BootstrapTooltip title='Add to Cart' placement='bottom'>
                <IconButton
                  onClick={handleAddItem}
                  color='primary'
                  aria-label='add to shopping cart'
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </BootstrapTooltip>
            )}
          </>
        }
        title={item.title}
      />
      <CardMedia
        className={classes.media}
        image='/static/images/cards/paella.jpg'
        title='Paella dish'
      />
      <CardContent>
        <BootstrapTooltip title='Product Description' placement='bottom'>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.description}
          </Typography>
        </BootstrapTooltip>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <FormControlLabel
          control={ */}
        <BootstrapTooltip title='Wishlist' placement='top'>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            //name="icon"
          />
        </BootstrapTooltip>
        {/* }
          //label="Custom icon"
        /> */}
        <BootstrapTooltip title='Share' placement='right'>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </BootstrapTooltip>

        <BootstrapTooltip title='More Info' placement='top'>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </BootstrapTooltip>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default ProductCard;
