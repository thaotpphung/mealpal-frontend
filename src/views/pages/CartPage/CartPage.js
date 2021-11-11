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
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import RoundButton from '../../common/Buttons/RoundButton';
import { updateCart, clearCart } from '../../../redux/actions/cartActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import useEditMode from '../../../utils/hooks/useEditMode';
import useToggle from '../../../utils/hooks/useToggle';
import { formatMixedNumber } from '../../../utils/mixedNumber';

const CartPage = () => {
  const localClasses = useStyles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { handleCloseEditMode, openEditMode, toggleOpenEditMode } = useEditMode(
    () => {
      setCartForm(cart);
    }
  );
  const [showRecipeNameList, toggleShowRecipeNameList] = useToggle(false);
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

  const handleClickDeleteCart = () => {
    dispatch(clearCart());
  };

  const handleSendEmail = () => {
    if (!loggedInUser.isVerified) {
      dispatch(
        addAlertWithTimeout(
          'error',
          'Please confirm your email to use this service (Profile > Confirm Email)'
        )
      );
    }
  };

  // TODO
  const handleSubmitUpdateCart = () => {};
  const handleAddIngredient = () => {};
  const handleDeleteIngredient = (event, ingredientName) => {};
  const handleChangeIngredient = (event, oldIngredientName) => {};
  const handleAddIngredientUnit = () => {};
  const handleDeleteIngredientUnit = () => {};

  return (
    <>
      <Paper className={localClasses.root}>
        <CardHeader
          title="Shopping Cart"
          action={
            <>
              <RoundButton type="send" handleClick={handleSendEmail} />
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
                          <ListItem dense button>
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
                            {showRecipeNameList ? (
                              <RoundButton
                                type="expandLess"
                                handleClick={toggleShowRecipeNameList}
                              />
                            ) : (
                              <RoundButton
                                type="expandMore"
                                handleClick={toggleShowRecipeNameList}
                              />
                            )}
                          </ListItem>
                          <Collapse
                            in={showRecipeNameList}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div className={localClasses.nested}>
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
                                    {recipeIdx < recipes.length - 1 &&
                                      ', \u00A0'}
                                  </Typography>
                                )
                              )}
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

          {/* {openEditMode && (
            <div>
              {Object.entries(cartForm).map(([ingredientName, value]) => (
                <div
                  key={`edit-form-${ingredientName}`}
                  className={localClasses.editForm}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}></Grid>
                    <Grid item xs={12} sm={3}>
                      <Input
                        label="Ingredient"
                        value={ingredientName}
                        handleChange={(event) =>
                          handleChangeIngredient(event, ingredientName)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      {Object.entries(value.units).map(([unit, amount]) => (
                        <Grid key={`unit-${unit}`} container spacing={3}>
                          <Grid item xs={12} sm={3}>
                            <Input
                              label="Whole"
                              type="number"
                              value={amount.whole}
                              handleChange={(event) => {
                                const { value } = event.target;
                                if (value % 1 === 0) {
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Input
                              label="Numer"
                              type="number"
                              value={amount.numer}
                              handleChange={(event) => {
                                const { value } = event.target;
                                if (value % 1 === 0) {
                                }
                              }}
                            />
                            <hr />
                            <Input
                              label="Denom"
                              type="number"
                              value={amount.denom}
                              handleChange={(event) => {
                                const { value } = event.target;
                                if (value % 1 === 0) {
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <AutocompleteField
                              label="Unit"
                              value={unit}
                              toggleOpen={toggleOpenDialog}
                              setDialogValue={setNewUnit}
                              handleChangeAutocompleteField={handleChange}
                              param="label"
                              options={unitOptions}
                              changedParams={[itemIdx, item, 'unit']}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <RoundButton
                              type="addField"
                              handleClick={handleAddIngredientUnit}
                            />
                            <RoundButton
                              type="deleteField"
                              handleClick={handleDeleteIngredientUnit}
                            />
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <div className={localClasses.action}>
                    <RoundButton type="add" handleClick={handleAddIngredient} />
                    <RoundButton
                      type="delete"
                      handleClick={(event) =>
                        handleDeleteIngredient(event, ingredientName)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </CardBody>
      </Paper>
    </>
  );
};

export default CartPage;
