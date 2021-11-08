import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import RoundButton from '../../common/Buttons/RoundButton';
import { updateCart, clearCart } from '../../../redux/actions/cartActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import { formatMixedNumber } from '../../../utils/mixedNumber';
import { display } from '@mui/system';

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [cartForm, setCartForm] = useState({ cart });
  const { loggedInUser } = useSelector((state) => state.user);
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (value) => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];
    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    // setChecked(newChecked);
  };
  const handleClickDeleteCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Paper className={classes.root}>
        <CardHeader
          title="Shopping Cart"
          action={
            <>
              <RoundButton type="delete" handleClick={handleClickDeleteCart} />
              <RoundButton type="edit" />
            </>
          }
        />
        <CardBody>
          <List className={classes.container}>
            {Object.entries(cart).map(([food, value], foodIdx) => {
              const labelId = `checkbox-list-label-${food}-${foodIdx}}`;
              return (
                // <>
                //   {Object.entries(value.units).map(
                //     ([unit, amount], unitIdx) => {
                //       const labelId = `checkbox-list-label-${food}-${foodIdx}-${unitIdx}`;
                //       return (
                <div key={`list-${food}`}>
                  <ListItem dense button>
                    <ListItemIcon>
                      <Checkbox
                        onChange={handleToggle}
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography>
                          {Object.entries(value.units).map(
                            ([unit, amount], unitIdx, array) => (
                              <span key={`unit-${unit}-${unitIdx}`}>
                                {formatMixedNumber(amount)}
                                {'\u00A0'}
                                {unit}
                                {'\u00A0'}
                                {unitIdx < array.length - 1 && '+ '}
                              </span>
                            )
                          )}
                          <strong>{food}</strong>{' '}
                        </Typography>
                      }
                    />
                    {open ? (
                      <ExpandLess onClick={handleClick} />
                    ) : (
                      <ExpandMore onClick={handleClick} />
                    )}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className={classes.nested}>
                      {/* {console.log('recipes', new Array(value.recipes))} */}
                      <RestaurantMenuIcon
                        style={{ margin: '10px 10px 10px 0' }}
                      />
                      {Object.keys(value.recipes).map(
                        (recipeName, recipeIdx, recipes) => (
                          <Typography
                            key={`recipe-name-${recipeName}-${recipeIdx}`}
                            component="span"
                          >
                            {recipeName}
                            {recipeIdx < recipes.length - 1 && ', \u00A0'}
                          </Typography>
                        )
                      )}
                    </div>
                  </Collapse>
                </div>
                //     );
                //   }
                // )}

                // </>
              );
            })}
          </List>
        </CardBody>
      </Paper>
    </>
  );
};

export default CartPage;
