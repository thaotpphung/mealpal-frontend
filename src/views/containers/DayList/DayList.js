import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import RoundButton from '../../common/Buttons/RoundButton';
import useForm from '../../../utils/hooks/useForm';
import useEditMode from '../../../utils/hooks/useEditMode';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import { createRecipe } from '../../../redux/actions/recipeActions';
import { updateWeekByDay } from '../../../redux/actions/weekActions';
import {
  addToCartByDay,
  addToCartByMeal,
} from '../../../redux/actions/cartActions';
import cloneDeep from 'lodash/cloneDeep';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { validate } from '../../../utils/validations/validate';
import unitOptions from '../../../constants/units';
import { processIngredients } from '../../../utils/forms/ingredients';
import { convertMixedToNum } from '../../../utils/mixedNumber';

const DayList = ({ days, recipes, userId }) => {
  console.log('recipes in daylist', recipes);

  const classes = useStyles();
  const { weekId } = useParams();
  const history = useHistory();
  const localClasses = styles();
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isInEditDayMode, setIsInEditDayMode] = useState([]);
  const defaultEditDayMode = new Array(days.length).fill(false);
  const [dayForm, setDayForm] = useState({});
  const [daysWithCalories, setDaysWithCalories] = useState([]);
  const extractedFieldsForAutoComplete = recipes.map((recipe) => {
    return {
      name: recipe.name,
      _id: recipe._id,
      calories: recipe.calories,
      ingredients: recipe.ingredients,
    };
  });
  const initialRecipe = {
    name: '',
    _id: '',
    calories: 0,
  };
  const initialFood = {
    amount: {
      whole: 0,
      numer: 0,
      denom: 1,
      toString: '',
    },
    unit: { label: 'none' },
    ingredientName: '',
    calPerUnit: 0,
  };
  const initialMeal = {
    name: '[Meal Name]',
    recipes: [{ ...initialRecipe }],
    food: [{ ...initialFood }],
    calories: 0,
  };

  // calculate calories
  useEffect(() => {
    let updatedDays = cloneDeep(days);
    updatedDays.forEach((day) => {
      let dayTotalCalories = 0;
      day.meals.forEach((meal) => {
        let mealTotalCalories = 0;
        mealTotalCalories += calculateRecipesCalories(meal.recipes);
        mealTotalCalories += calculateFoodCalories(meal.food);
        meal.calories = mealTotalCalories;
        dayTotalCalories += mealTotalCalories;
      });
      day.calories = dayTotalCalories;
    });
    setDaysWithCalories(updatedDays);
  }, []);
  const calculateDayCalories = (day) => {
    const dayTotalCalories = day.meals.reduce(function (acc, meal) {
      return acc + meal.calories;
    }, 0);
    return Number.isNaN(dayTotalCalories) ? 0 : dayTotalCalories;
  };
  const calculateMealCalories = (meal) => {
    let mealTotalCalories = 0;
    mealTotalCalories += calculateRecipesCalories(meal.recipes);
    mealTotalCalories += calculateFoodCalories(meal.food);
    return Number.isNaN(mealTotalCalories) ? 0 : mealTotalCalories;
  };
  const calculateRecipesCalories = (recipes) => {
    const calculatedCalories = recipes.reduce(function (acc, recipe) {
      return acc + recipe.calories;
    }, 0);
    return calculatedCalories;
  };
  const calculateFoodCalories = (food) => {
    const calculatedCalories = food.reduce(function (acc, ingredient) {
      return acc + ingredient.calPerUnit * convertMixedToNum(ingredient.amount);
    }, 0);
    return calculatedCalories;
  };

  // edit day mode
  const handleEnableEditDayMode = (dayIdx) => {
    const modes = [...defaultEditDayMode];
    modes[dayIdx] = true;
    // copy current day
    const day = { ...daysWithCalories[dayIdx] };
    // if there is no meal, set an initial meal value
    if (day.meals.length === 0) {
      day.meals[0] = {
        ...initialMeal,
      };
    }
    day.meals.forEach((meal) => {
      // if in a meal, there is no recipe, then set initial recipes
      if (meal.recipes.length === 0) {
        meal.recipes = [{ ...initialRecipe }];
      }
      // if in a meal, there is no food, then set initial food
      if (meal.food.length === 0) {
        meal.food = [{ ...initialFood }];
      }
    });
    setDayForm(day);
    setIsInEditDayMode(modes);
  };
  const handleCancelEditDayMode = (dayIdx) => {
    const modes = [...defaultEditDayMode];
    setDayForm(daysWithCalories[dayIdx]);
    setIsInEditDayMode(modes);
  };

  // update week by day
  const { handleSubmit, errors } = useForm({}, (dayIdx) => {
    dispatch(updateWeekByDay(weekId, dayIdx, dayForm));
  });
  const handleSubmitUpdateDay = (event, dayIdx) => {
    // validate
    let currentErrors = {};
    // if the only meal is the default meal, remove the meal
    dayForm.meals.forEach((meal, mealIdx) => {
      // validate meal
      if (meal.name.trim() === '' && mealIdx !== 0) {
        currentErrors[`meal${mealIdx}`] = '';
      }
      // validate recipes
      meal.recipes.forEach((recipe, recipeIdx) => {
        if (recipe.name.trim() === '' && recipeIdx !== 0) {
          currentErrors[`meal${mealIdx}recipes${recipeIdx}`] = '';
        }
      });
      // validate food
      const regex = /^\d{1,5}(?: [1-9]\d{0,2}\/[1-9]\d{0,2})?$/;
      meal.food.forEach((item, itemIdx) => {
        const { amount, ingredientName, calPerUnit } = item;
        // if the first row is the default row, then skip validation
        if (
          amount.toString.trim() === '' &&
          ingredientName.trim() === '' &&
          calPerUnit === 0 &&
          itemIdx === 0
        ) {
          return;
        }
        if (
          !amount.toString ||
          amount.toString.trim() === '' ||
          !regex.test(amount.toString.trim())
        ) {
          currentErrors[`meal${mealIdx}food${itemIdx}amount`] = '';
        }
        if (!ingredientName || ingredientName.trim() === '') {
          currentErrors[`meal${mealIdx}food${itemIdx}ingredientName`] = '';
        }
        if (calPerUnit === '' || calPerUnit < 0 || calPerUnit > 10000) {
          currentErrors[`meal${mealIdx}food${itemIdx}calPerUnit`] = '';
        }
      });
    });
    // process
    if (Object.keys(currentErrors).length === 0) {
      if (dayForm.meals.length === 1 && dayForm.meals[0]._id === '') {
        dayForm.meals = [];
      } else {
        dayForm.meals.forEach((meal) => {
          // if the only recipe is the default recipe, remove the recipe
          if (meal.recipes.length === 1 && meal.recipes[0]._id === '') {
            meal.recipes = [];
          }
          // if the only food is the default food, remove the food
          if (meal.food.length === 1 && meal.food[0].amount.toString === '') {
            meal.food = [];
          }
          processIngredients(meal.food);
        });
      }
    }
    // submit
    handleSubmit(event, currentErrors, [dayIdx]);
  };

  // meal
  const handleDeleteMeal = (mealIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals.splice(mealIdx, 1);
    setDayForm(updatedDays);
  };
  const handleAddMeal = (mealIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals.splice(mealIdx + 1, 0, { ...initialMeal });
    setDayForm(updatedDays);
  };
  const handleChangeMeal = (event, mealIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].name = event.target.value;
    setDayForm(updatedDays);
  };
  // drag meal
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const updatedDays = cloneDeep(dayForm);
    const [reorderedItem] = updatedDays.meals.splice(result.source.index, 1);
    updatedDays.meals.splice(result.destination.index, 0, reorderedItem);
    setDayForm(updatedDays);
  };

  // meal.recipes
  const handleChangeRecipe = (mealIdx, recipeIdx, newValue) => {
    const updatedDay = cloneDeep(dayForm);
    updatedDay.meals[mealIdx].recipes[recipeIdx] = newValue;
    updatedDay.meals[mealIdx].calories = calculateMealCalories(
      updatedDay.meals[mealIdx]
    );
    updatedDay.calories = calculateDayCalories(updatedDay);
    setDayForm(updatedDay);
  };
  const handleDeleteRecipe = (mealIdx, recipeIdx, recipe) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].recipes.splice(recipeIdx, 1);
    updatedDays.meals[mealIdx].calories -= recipe.calories;
    updatedDays.calories -= recipe.calories;
    setDayForm(updatedDays);
  };
  const handleAddRecipe = (mealIdx, recipeIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].recipes.splice(recipeIdx + 1, 0, {
      ...initialRecipe,
    });
    setDayForm(updatedDays);
  };

  // new recipe dialog form
  const [newRecipeParams, setNewRecipeParams] = useState([]);
  const {
    openEditMode: openNewRecipeDialog,
    toggleOpenEditMode: toggleOpenNewRecipeDialog,
    handleCloseEditMode: handleCloseNewRecipeDialog,
  } = useEditMode(() => resetNewRecipe());
  const {
    handleChange: handleChangeNewRecipe,
    handleSubmit: handleSubmitCreateRecipe,
    values: newRecipe,
    setValue: setNewRecipe,
    reset: resetNewRecipe,
    errors: newRecipeErrors,
  } = useForm(
    {
      name: '',
      calories: 0,
    },
    () => {
      dispatch(
        createRecipe({
          ...newRecipe,
        })
      );
      handleCloseNewRecipeDialog();
      handleChangeRecipe(...newRecipeParams, newRecipe);
    }
  );

  // meal.food
  const handleChangeFood = (mealIdx, itemIdx, newValue) => {
    const updatedDay = cloneDeep(dayForm);
    updatedDay.meals[mealIdx].food[itemIdx] = newValue;
    updatedDay.meals[mealIdx].calories = calculateMealCalories(
      updatedDay.meals[mealIdx]
    );
    updatedDay.calories = calculateDayCalories(updatedDay);
    setDayForm(updatedDay);
  };
  const handleDeleteFood = (mealIdx, itemIdx, item) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food.splice(itemIdx, 1);
    const changedCalories = item.calPerUnit * convertMixedToNum(item.amount);
    updatedDays.meals[mealIdx].calories -= changedCalories;
    updatedDays.calories -= changedCalories;
    setDayForm(updatedDays);
  };
  const handleAddFood = (mealIdx, itemIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food.splice(itemIdx + 1, 0, {
      ...initialFood,
    });
    setDayForm(updatedDays);
  };

  const handleChangeIngredientEntry = (mealIdx, itemIdx, item, key, value) => {
    handleChangeFood(mealIdx, itemIdx, { ...item, [key]: value });
  };

  // new unit dialog form
  const [newUnitParams, setNewUnitParams] = useState([]);
  const {
    openEditMode: openNewUnitDialog,
    toggleOpenEditMode: toggleOpenNewUnitDialog,
    handleCloseEditMode: handleCloseNewUnitDialog,
  } = useEditMode(() => resetNewUnit());
  const {
    handleChange: handleChangeUnit,
    handleSubmit: handleSubmitCreateUnit,
    values: newUnit,
    setValue: setNewUnit,
    reset: resetNewUnit,
    errors: newUnitErrors,
  } = useForm(
    { label: '' },
    (unit) => {
      unitOptions.push({ label: unit.toLowerCase() });
      handleCloseNewUnitDialog();
      handleChangeIngredientEntry(...newUnitParams, newUnit);
    },
    validate
  );
  const handleCreateUnit = (event, unit) => {
    handleSubmitCreateUnit(event, {}, [unit]);
  };

  return (
    <div>
      <PopupDialog
        title="Add a new recipe"
        content={
          <div className={classes.formPaper}>
            <Input
              name="name"
              label="Recipe Name"
              handleChange={handleChangeNewRecipe}
              value={newRecipe.name}
              error={newRecipeErrors.name}
              required
            />
            <Input
              name="calories"
              label="Calories"
              type="number"
              handleChange={handleChangeNewRecipe}
              value={newRecipe.calories}
              error={newRecipeErrors.calories}
              required
            />
          </div>
        }
        handleSubmit={handleSubmitCreateRecipe}
        open={openNewRecipeDialog}
        handleClose={handleCloseNewRecipeDialog}
      />
      <PopupDialog
        title="Add a new unit"
        content={
          <div className={classes.formPaper}>
            <Input
              name="label"
              label="Unit"
              handleChange={handleChangeUnit}
              value={newUnit.label}
              error={newUnitErrors.label}
              required
            />
          </div>
        }
        handleSubmit={(event) => handleCreateUnit(event, newUnit.label)}
        open={openNewUnitDialog}
        handleClose={handleCloseNewUnitDialog}
      />
      {daysWithCalories.map((day, dayIdx) => (
        <Paper key={`day-card-${day._id}-${dayIdx}`}>
          <CardHeader
            title={`${day.name}`}
            action={
              <>
                {!!loggedInUser && loggedInUser._id === userId._id && (
                  <>
                    {!!weekId && (
                      <>
                        {isInEditDayMode[dayIdx] ? (
                          <>
                            <RoundButton
                              type="cancel"
                              handleClick={() =>
                                handleCancelEditDayMode(dayIdx)
                              }
                            />
                            <RoundButton
                              type="done"
                              handleClick={(event) =>
                                handleSubmitUpdateDay(event, dayIdx)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <RoundButton
                              type={isInEditDayMode[dayIdx] ? 'cancel' : 'edit'}
                              handleClick={() =>
                                handleEnableEditDayMode(dayIdx)
                              }
                            />
                            <RoundButton
                              type="shoppingCart"
                              handleClick={() =>
                                dispatch(
                                  addToCartByDay(
                                    daysWithCalories[dayIdx],
                                    history
                                  )
                                )
                              }
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            }
          />
          <CardBody>
            {!isInEditDayMode[dayIdx] && (
              <>
                {day.meals.map((meal, mealIdx) => {
                  return (
                    <Grid
                      container
                      spacing={2}
                      alignItems="stretch"
                      key={`meal-in-day-card-${meal._id}-${dayIdx}-${mealIdx}}`}
                    >
                      <Grid item xs={4} sm={2}>
                        <Typography>
                          <strong>{meal.name}</strong>
                        </Typography>
                        <Typography>{meal.calories.toFixed(2)} kCal</Typography>
                      </Grid>
                      <Grid item xs={6} sm={8}>
                        <ul className={localClasses.menuContent}>
                          {!isInEditDayMode[dayIdx] && (
                            <>
                              {meal.recipes.map((recipe, recipeIdx) => {
                                return (
                                  <li
                                    key={`recipe-in-meal-${recipe._id}-${recipeIdx})}`}
                                  >
                                    <RestaurantMenuIcon
                                      className={classes.foodIcon}
                                    />
                                    <Link
                                      to={{
                                        pathname: `/recipes/${recipe._id}`,
                                      }}
                                    >
                                      <Typography>{recipe.name}</Typography>
                                    </Link>
                                  </li>
                                );
                              })}
                              {meal.food.map((ingredient, ingredientIdx) => {
                                return (
                                  <li
                                    key={`ingredient-in-meal-${ingredient._id}-${ingredientIdx})}`}
                                  >
                                    <FastfoodIcon
                                      className={classes.foodIcon}
                                    />
                                    <Typography>
                                      {ingredient.amount.toString}
                                      {'\u00A0'}
                                      {ingredient.unit.label !== 'none' &&
                                        ingredient.unit.label}
                                      {'\u00A0'}
                                      <strong>
                                        {ingredient.ingredientName}
                                      </strong>
                                    </Typography>
                                  </li>
                                );
                              })}
                            </>
                          )}
                        </ul>
                      </Grid>
                      {!!loggedInUser && loggedInUser._id === userId._id && (
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          className={localClasses.rowAction}
                        >
                          <RoundButton
                            type="shoppingCart"
                            handleClick={() => {
                              dispatch(
                                addToCartByMeal(
                                  daysWithCalories[dayIdx].meals[mealIdx],
                                  history
                                )
                              );
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  );
                })}
                <Typography className={localClasses.total}>
                  <strong>Total:</strong> {day.calories.toFixed(2)} kCal
                </Typography>
              </>
            )}
            {isInEditDayMode[dayIdx] && dayForm !== undefined && (
              <>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="meals">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {dayForm.meals.map((meal, mealIdx) => {
                          return (
                            <Draggable
                              key={`meal-in-field-${meal._id}-${mealIdx}`}
                              draggableId={`meal-in-field-${meal._id}-${mealIdx}`}
                              index={mealIdx}
                            >
                              {(provided) => (
                                <Grid
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  container
                                  spacing={2}
                                >
                                  <Grid item xs={12} sm={2}>
                                    <Input
                                      value={meal.name}
                                      handleChange={(e) =>
                                        handleChangeMeal(e, mealIdx)
                                      }
                                      error={errors[`meal${mealIdx}`]}
                                      required
                                    />
                                    <Typography>
                                      {meal.calories.toFixed(2)} kCal
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={8}>
                                    {meal.recipes.length === 0 && (
                                      <div className={localClasses.addButton}>
                                        <RestaurantMenuIcon />
                                        <Button
                                          color="primary"
                                          variant="contained"
                                          onClick={() =>
                                            handleAddRecipe(mealIdx, 0)
                                          }
                                        >
                                          Add Recipe
                                        </Button>
                                      </div>
                                    )}
                                    <ul className={localClasses.menuContent}>
                                      {meal.recipes.map((recipe, recipeIdx) => (
                                        <li
                                          key={`recipe-field-${recipe._id}-${recipeIdx}`}
                                        >
                                          <RestaurantMenuIcon
                                            className={localClasses.foodIcon}
                                          />
                                          <Grid container>
                                            <Grid item xs={10}>
                                              <AutocompleteField
                                                label="Recipes"
                                                value={recipe}
                                                toggleOpen={() => {
                                                  toggleOpenNewRecipeDialog();
                                                  setNewRecipeParams([
                                                    mealIdx,
                                                    recipeIdx,
                                                  ]);
                                                }}
                                                setDialogValue={setNewRecipe}
                                                handleChangeAutocompleteField={
                                                  handleChangeRecipe
                                                }
                                                param="name"
                                                options={
                                                  extractedFieldsForAutoComplete
                                                }
                                                changedParams={[
                                                  mealIdx,
                                                  recipeIdx,
                                                ]}
                                                error={
                                                  errors[
                                                    `meal${mealIdx}recipes${recipeIdx}`
                                                  ]
                                                }
                                                required
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              xs={2}
                                              className={
                                                localClasses.fieldAction
                                              }
                                            >
                                              <RoundButton
                                                type="addField"
                                                handleClick={() =>
                                                  handleAddRecipe(
                                                    mealIdx,
                                                    recipeIdx
                                                  )
                                                }
                                              />
                                              <RoundButton
                                                type="deleteField"
                                                handleClick={() =>
                                                  handleDeleteRecipe(
                                                    mealIdx,
                                                    recipeIdx,
                                                    recipe
                                                  )
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </li>
                                      ))}
                                      {meal.food.length === 0 && (
                                        <div className={localClasses.addButton}>
                                          <FastfoodIcon />
                                          <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() =>
                                              handleAddFood(mealIdx, 0)
                                            }
                                          >
                                            Add Food
                                          </Button>
                                        </div>
                                      )}
                                      {meal.food.map((item, itemIdx) => (
                                        <li key={`food-field-${itemIdx}`}>
                                          <FastfoodIcon
                                            className={localClasses.foodIcon}
                                          />
                                          <Grid container>
                                            <Grid item xs={10}>
                                              <Grid
                                                container
                                                spacing={1}
                                                alignItems="center"
                                              >
                                                <Grid item xs={8} md={6} lg={3}>
                                                  <InputWithTooltip
                                                    label="Amt"
                                                    tooltip="Number (Ex: 1) or Number Fraction (ex: 1 1/2)"
                                                    value={item.amount.toString}
                                                    handleChange={(event) => {
                                                      handleChangeIngredientEntry(
                                                        mealIdx,
                                                        itemIdx,
                                                        item,
                                                        'amount',
                                                        {
                                                          ...item.amount,
                                                          ['toString']:
                                                            event.target.value,
                                                        }
                                                      );
                                                    }}
                                                    error={
                                                      errors[
                                                        `meal${mealIdx}food${itemIdx}amount`
                                                      ]
                                                    }
                                                  />
                                                </Grid>
                                                <Grid item xs={4} md={6} lg={3}>
                                                  <AutocompleteField
                                                    label="Unit"
                                                    value={item.unit.label}
                                                    toggleOpen={() => {
                                                      toggleOpenNewUnitDialog();
                                                      setNewUnitParams([
                                                        mealIdx,
                                                        itemIdx,
                                                        item,
                                                        'unit',
                                                      ]);
                                                    }}
                                                    setDialogValue={setNewUnit}
                                                    handleChangeAutocompleteField={
                                                      handleChangeIngredientEntry
                                                    }
                                                    param="label"
                                                    options={unitOptions}
                                                    changedParams={[
                                                      mealIdx,
                                                      itemIdx,
                                                      item,
                                                      'unit',
                                                    ]}
                                                  />
                                                </Grid>
                                                <Grid item xs={8} md={6} lg={3}>
                                                  <Input
                                                    label="Food"
                                                    required
                                                    value={item.ingredientName}
                                                    handleChange={(event) =>
                                                      handleChangeIngredientEntry(
                                                        mealIdx,
                                                        itemIdx,
                                                        item,
                                                        'ingredientName',
                                                        event.target.value
                                                      )
                                                    }
                                                    error={
                                                      errors[
                                                        `meal${mealIdx}food${itemIdx}ingredientName`
                                                      ]
                                                    }
                                                  />
                                                </Grid>
                                                <Grid item xs={4} md={6} lg={3}>
                                                  <Input
                                                    label="kCal/Unit"
                                                    type="number"
                                                    value={item.calPerUnit}
                                                    handleChange={(event) =>
                                                      handleChangeIngredientEntry(
                                                        mealIdx,
                                                        itemIdx,
                                                        item,
                                                        'calPerUnit',
                                                        event.target.value
                                                      )
                                                    }
                                                    error={
                                                      errors[
                                                        `meal${mealIdx}food${itemIdx}calPerUnit`
                                                      ]
                                                    }
                                                  />
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={2}
                                              className={
                                                localClasses.fieldAction
                                              }
                                            >
                                              <RoundButton
                                                type="addField"
                                                handleClick={() =>
                                                  handleAddFood(
                                                    mealIdx,
                                                    itemIdx
                                                  )
                                                }
                                              />
                                              <RoundButton
                                                type="deleteField"
                                                handleClick={() =>
                                                  handleDeleteFood(
                                                    mealIdx,
                                                    itemIdx,
                                                    item
                                                  )
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </li>
                                      ))}
                                    </ul>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                    className={localClasses.rowAction}
                                  >
                                    <RoundButton
                                      type="add"
                                      handleClick={() => handleAddMeal(mealIdx)}
                                    />
                                    <RoundButton
                                      type="delete"
                                      handleClick={() =>
                                        handleDeleteMeal(mealIdx)
                                      }
                                    />
                                  </Grid>
                                </Grid>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
                <Typography className={localClasses.total}>
                  <strong>Total:</strong> {dayForm.calories} kCal
                </Typography>
              </>
            )}
          </CardBody>
        </Paper>
      ))}
    </div>
  );
};

export default DayList;
