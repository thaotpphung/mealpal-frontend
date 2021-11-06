import React, { useState } from 'react';
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
import Message from '../../common/Message/Message';
import RoundButton from '../../common/Buttons/RoundButton';
import { updateCart } from '../../../redux/actions/cartActions';

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [cartForm, setCartForm] = useState({ cart });

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

  return (
    <>
      {/* <Message
        severity="info"
        message="This cart is estimatedly generated, please make changes as you wish"
      /> */}
      <Paper className={classes.root}>
        <CardHeader
          title="Shopping Cart"
          action={<RoundButton type="edit" />}
        />
        <CardBody>
          <List className={classes.container}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <>
                  <ListItem key={value} dense button>
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
                        <typography>
                          <strong>{`3 1/2 Banana`}</strong>
                        </typography>
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
                      <RestaurantMenuIcon
                        style={{ margin: '10px 10px 10px 0' }}
                      />
                      {['blue berry', 'chicken pie'].map((recipeName, idx) => (
                        <Typography
                          key={`name-${recipeName}-${idx}`}
                          component="span"
                        >
                          {recipeName}
                          {',\u00A0'}
                        </Typography>
                      ))}
                    </div>
                  </Collapse>
                </>
              );
            })}
          </List>
        </CardBody>
      </Paper>
    </>
  );
};

export default CartPage;
