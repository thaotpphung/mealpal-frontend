import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import useStyles from '../../../app/styles';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Spinner from '../../common/Spinner/Spinner';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import RoundButton from '../../common/Buttons/RoundButton';
import { updateCart, clearCart } from '../../../redux/actions/cartActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import useEditMode from '../../../utils/hooks/useEditMode';
import { formatMixedNumber } from '../../../utils/mixedNumber';
import { sendCart } from '../../../api/index';

const CartPage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { handleCloseEditMode, openEditMode } = useEditMode(() => {
    setCartForm(cart);
  });
  const [cartForm, setCartForm] = useState(cart);
  const handleSelectCheckBox = (event) => {
    let updatedCart = {
      ...cartForm,
      [event.target.name]: {
        ...cartForm[event.target.name],
        checked: event.target.checked,
      },
    };
    setCartForm(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const handleToggleShowDetails = (ingredientName) => {
    let updatedCart = {
      ...cartForm,
      [ingredientName]: {
        ...cartForm[ingredientName],
        showDetails: !cartForm[ingredientName].showDetails,
      },
    };
    setCartForm(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const handleClickDeleteCart = () => {
    dispatch(clearCart());
  };

  const [isSending, setIsSending] = useState(false);
  const handleSendEmail = () => {
    if (loggedInUser.isVerified) {
      setIsSending(true);
      sendCart(loggedInUser._id, cartForm)
        .then(({ data }) => {
          dispatch(addAlertWithTimeout('success', data.message));
        })
        .catch((error) => {
          dispatch(addAlertWithTimeout('error', error.response.data.message));
        })
        .finally(() => setIsSending(false));
    } else {
      dispatch(
        addAlertWithTimeout(
          'error',
          'Please confirm your email to use this service (Profile > Contact)'
        )
      );
    }
  };

  // TODO
  const handleSubmitUpdateCart = () => {};

  return (
    <>
      {isSending && <Spinner />}
      <Paper className={localClasses.root}>
        <CardHeader
          title="Shopping Cart"
          action={
            <>
              <RoundButton
                type="send"
                handleClick={handleSendEmail}
                loading={isSending}
              />
              <RoundButton type="delete" handleClick={handleClickDeleteCart} />
              {openEditMode ? (
                <>
                  <RoundButton
                    type="cancel"
                    handleClick={handleCloseEditMode}
                  />
                  <RoundButton
                    type="done"
                    handleClick={handleSubmitUpdateCart}
                  />
                </>
              ) : (
                <></>
                // TODO <RoundButton type="edit" handleClick={toggleOpenEditMode} />
              )}
            </>
          }
        />
        <CardBody>
          {Object.keys(cart).length === 0 ? (
            <EmptyMessage />
          ) : (
            <>
              {!openEditMode && (
                <List className={localClasses.container}>
                  {Object.entries(cart).map(
                    ([ingredientName, value], ingredientNameIdx) => {
                      const labelId = `checkbox-list-label-${ingredientName}-${ingredientNameIdx}}`;
                      return (
                        <div key={`list-${ingredientName}`}>
                          <ListItem>
                            <ListItemIcon>
                              <Checkbox
                                onChange={(event) =>
                                  handleSelectCheckBox(event)
                                }
                                name={ingredientName}
                                edge="start"
                                checked={cartForm[ingredientName].checked}
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
                                        {unit !== 'none' && unit}
                                        {'\u00A0'}
                                        {unitIdx < array.length - 1 && '+ '}
                                      </span>
                                    )
                                  )}
                                  <strong>{ingredientName}</strong>{' '}
                                </Typography>
                              }
                            />
                            <RoundButton
                              type={
                                value.showDetails ? 'expandLess' : 'expandMore'
                              }
                              handleClick={() =>
                                handleToggleShowDetails(ingredientName)
                              }
                            />
                          </ListItem>
                          <Collapse
                            in={value.showDetails}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div className={localClasses.nested}>
                              {value.recipes.map((name, recipeIdx) => (
                                <Chip
                                  key={`recipe-name-${name}-${recipeIdx}`}
                                  className={classes.tag}
                                  label={name}
                                />
                              ))}
                            </div>
                          </Collapse>
                        </div>
                      );
                    }
                  )}
                </List>
              )}
            </>
          )}
        </CardBody>
      </Paper>
    </>
  );
};

export default CartPage;
