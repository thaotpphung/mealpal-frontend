import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
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

const DayList = ({ days, recipes, userId }) => {
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
      recipeName: recipe.recipeName,
      _id: recipe._id,
      calories: recipe.calories,
      ingredients: recipe.ingredients,
    };
  });

  useEffect(() => {
    let updatedDays = cloneDeep(days);
    updatedDays.forEach((day) => {
      let dayTotalCalories = 0;
      day.meals.forEach((meal) => {
        let mealTotalCalories = meal.food.reduce((acc, recipe) => {
          return acc + recipe.calories;
        }, 0);
        meal.calories = mealTotalCalories;
        dayTotalCalories += mealTotalCalories;
      });
      day.calories = dayTotalCalories;
    });
    setDaysWithCalories(updatedDays);
  }, []);

  const initialRecipe = {
    recipeName: '',
    _id: '',
    calories: 0,
  };
  // new recipe dialog form
  const {
    openEditMode: openNewRecipeDialog,
    toggleOpenEditMode: toggleOpenNewRecipeDialog,
    handleCloseEditMode: handleCloseNewRecipeDialog,
  } = useEditMode(() => resetNewRecipe());
  const {
    handleChange: handleChangeRecipe,
    handleSubmit: handleSubmitCreateRecipe,
    values: newRecipe,
    setValue: setNewRecipe,
    reset: resetNewRecipe,
    errors: newRecipeErrors,
  } = useForm(
    {
      recipeName: '',
      calories: 0,
    },
    () => {
      dispatch(
        createRecipe({
          ...newRecipe,
        })
      );
      handleCloseNewRecipeDialog();
    }
  );
  // edit day mode
  const handleEnableEditDayMode = (dayIdx) => {
    const modes = [...defaultEditDayMode];
    modes[dayIdx] = true;
    const day = { ...daysWithCalories[dayIdx] };
    if (day.meals.length === 0) {
      day.meals[0] = {
        mealName: '[PlaceHolder]',
        food: [{ ...initialRecipe }],
        calories: 0,
      };
    }
    day.meals.forEach((meal) => {
      if (meal.food.length === 0) meal.food = [{ ...initialRecipe }];
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
    let currentErrors = {};
    dayForm.meals.forEach((meal, mealIdx) => {
      if (meal.mealName.trim() === '') currentErrors[`meal${mealIdx}`] = '';
      meal.food.forEach((recipe, recipeIdx) => {
        if (recipe.recipeName.trim() === '')
          currentErrors[`meal${mealIdx}food${recipeIdx}`] = '';
      });
    });
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
    updatedDays.meals.splice(mealIdx + 1, 0, {
      mealName: '[Meal Name]',
      food: [{ ...initialRecipe }],
      calories: 0,
    });
    setDayForm(updatedDays);
  };
  const handleChangeMeal = (event, mealIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].mealName = event.target.value;
    setDayForm(updatedDays);
  };
  // food

  const calculateDayCalories = (day) => {
    const dayTotalCalories = day.meals.reduce(function (acc, meal) {
      return acc + meal.calories;
    }, 0);
    return Number.isNaN(dayTotalCalories) ? 0 : dayTotalCalories;
  };

  const calculateMealCalories = (meal) => {
    const mealTotalCalories = meal.food.reduce(function (acc, recipe) {
      return acc + recipe.calories;
    }, 0);
    return Number.isNaN(mealTotalCalories) ? 0 : mealTotalCalories;
  };

  const handleChangeFood = (mealIdx, recipeIdx, newValue) => {
    const updatedDay = cloneDeep(dayForm);
    updatedDay.meals[mealIdx].food[recipeIdx] = newValue;
    updatedDay.meals[mealIdx].calories = calculateMealCalories(
      updatedDay.meals[mealIdx]
    );
    updatedDay.calories = calculateDayCalories(updatedDay);
    setDayForm(updatedDay);
  };
  const handleDeleteFood = (mealIdx, recipeIdx, recipe) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food.splice(recipeIdx, 1);
    updatedDays.meals[mealIdx].calories -= recipe.calories;
    updatedDays.calories -= recipe.calories;
    setDayForm(updatedDays);
  };
  const handleAddFood = (mealIdx, recipeIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food.splice(recipeIdx + 1, 0, {
      ...initialRecipe,
    });
    setDayForm(updatedDays);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const updatedDays = cloneDeep(dayForm);
    const [reorderedItem] = updatedDays.meals.splice(result.source.index, 1);
    updatedDays.meals.splice(result.destination.index, 0, reorderedItem);
    setDayForm(updatedDays);
  };

  return (
    <div>
      <PopupDialog
        title="Add a new recipe"
        content={
          <div className={classes.formPaper}>
            <Input
              name="recipeName"
              label="Recipe Name"
              handleChange={handleChangeRecipe}
              value={newRecipe.recipeName}
              error={newRecipeErrors.recipeName}
              required
            />
            <Input
              name="calories"
              label="Calories"
              type="number"
              handleChange={handleChangeRecipe}
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
      {daysWithCalories.map((day, dayIdx) => (
        <Paper key={`day-card-${day._id}-${dayIdx}`}>
          <CardHeader
            title={`${day.dayName}`}
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
                      <Grid item xs={4} sm={3}>
                        <Typography>
                          <strong>{meal.mealName}</strong>
                        </Typography>
                        <Typography>{meal.calories} kCal</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <ul className={localClasses.menuContent}>
                          {!isInEditDayMode[dayIdx] && (
                            <>
                              {meal.food.map((recipe, recipeIdx) => {
                                return (
                                  <li
                                    key={`dish-in-meal-${recipe._id}-${recipeIdx})}`}
                                  >
                                    <RestaurantMenuIcon
                                      className={classes.foodIcon}
                                    />
                                    <Link
                                      to={{
                                        pathname: `/recipes/${recipe._id}`,
                                      }}
                                    >
                                      <Typography>
                                        {recipe.recipeName}
                                      </Typography>
                                    </Link>
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
                          sm={3}
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
                  <strong>Total:</strong> {day.calories} kCal
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
                              draggableId={meal._id}
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
                                  <Grid item xs={12} sm={3}>
                                    <Input
                                      value={meal.mealName}
                                      handleChange={(e) =>
                                        handleChangeMeal(e, mealIdx)
                                      }
                                      error={errors[`meal${mealIdx}`]}
                                      required
                                    />
                                    <Typography>
                                      {meal.calories} kCal
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <ul className={localClasses.menuContent}>
                                      {meal.food.map((recipe, recipeIdx) => (
                                        <li
                                          key={`food-field-${recipe._id}-${recipeIdx}`}
                                        >
                                          <RestaurantMenuIcon
                                            className={localClasses.foodIcon}
                                          />
                                          <AutocompleteField
                                            value={recipe}
                                            toggleOpen={
                                              toggleOpenNewRecipeDialog
                                            }
                                            setDialogValue={setNewRecipe}
                                            handleChangeAutocompleteField={
                                              handleChangeFood
                                            }
                                            param="recipeName"
                                            options={
                                              extractedFieldsForAutoComplete
                                            }
                                            changedParams={[mealIdx, recipeIdx]}
                                            error={
                                              errors[
                                                `meal${mealIdx}food${recipeIdx}`
                                              ]
                                            }
                                            style={{ minWidth: '70%' }}
                                            required
                                          />
                                          <div
                                            className={localClasses.fieldAction}
                                          >
                                            <RoundButton
                                              type="deleteField"
                                              handleClick={() =>
                                                handleDeleteFood(
                                                  mealIdx,
                                                  recipeIdx,
                                                  recipe
                                                )
                                              }
                                            />
                                            <RoundButton
                                              type="addField"
                                              handleClick={() =>
                                                handleAddFood(
                                                  mealIdx,
                                                  recipeIdx
                                                )
                                              }
                                            />
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={3}
                                    className={localClasses.rowAction}
                                  >
                                    <RoundButton
                                      type="delete"
                                      handleClick={() =>
                                        handleDeleteMeal(mealIdx)
                                      }
                                    />
                                    <RoundButton
                                      type="add"
                                      handleClick={() => handleAddMeal(mealIdx)}
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
