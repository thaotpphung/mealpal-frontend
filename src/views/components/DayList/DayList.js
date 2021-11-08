import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Paper, Typography } from '@material-ui/core';
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
  const extractedFieldsForAutoComplete = recipes.map((recipe) => {
    return {
      recipeName: recipe.recipeName,
      _id: recipe._id,
    };
  });

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
    const day = { ...days[dayIdx] };
    if (day.meals.length === 0) {
      day.meals[0] = {
        mealName: '[PlaceHolder]',
        food: [{ ...initialRecipe }],
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
    setDayForm(days[dayIdx]);
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
    });
    setDayForm(updatedDays);
  };
  const handleChangeMeal = (event, mealIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].mealName = event.target.value;
    setDayForm(updatedDays);
  };
  // food
  const handleChangeFood = (mealIdx, recipeIdx, newValue) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food[recipeIdx] = newValue;
    setDayForm(updatedDays);
  };
  const handleDeleteFood = (mealIdx, recipeIdx) => {
    const updatedDays = cloneDeep(dayForm);
    updatedDays.meals[mealIdx].food.splice(recipeIdx, 1);
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
      {days.map((day, dayIdx) => (
        <Paper key={`day-card-${day._id}-${dayIdx}`}>
          <CardHeader
            title={day.dayName}
            action={
              <>
                {!!loggedInUser && loggedInUser._id === userId._id && (
                  <>
                    <RoundButton
                      type="shoppingCart"
                      handleClick={() =>
                        dispatch(addToCartByDay(days[dayIdx], history))
                      }
                    />
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
            {!isInEditDayMode[dayIdx] &&
              day.meals.map((meal, mealIdx) => {
                return (
                  <div
                    key={`meal-in-day-card-${meal._id}-${dayIdx}-${mealIdx}}`}
                    className={localClasses.menuItem}
                  >
                    <div className={classes.itemIcon}>
                      <Typography>
                        <strong>{meal.mealName}</strong>
                      </Typography>
                    </div>
                    <div className={classes.itemContent}>
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
                                    <Typography>{recipe.recipeName}</Typography>
                                  </Link>
                                </li>
                              );
                            })}
                          </>
                        )}
                      </ul>
                    </div>
                    {!!loggedInUser && loggedInUser._id === userId._id && (
                      <div className={classes.itemAction}>
                        <RoundButton
                          type="shoppingCart"
                          handleClick={() =>
                            dispatch(
                              addToCartByMeal(
                                days[dayIdx].meals[mealIdx],
                                history
                              )
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            {isInEditDayMode[dayIdx] && dayForm !== undefined && (
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
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={localClasses.menuItem}
                              >
                                <div className={classes.itemIcon}>
                                  <Input
                                    value={meal.mealName}
                                    handleChange={(e) =>
                                      handleChangeMeal(e, mealIdx)
                                    }
                                    error={errors[`meal${mealIdx}`]}
                                    required
                                  />
                                </div>
                                <div className={classes.itemContent}>
                                  <ul className={localClasses.menuContent}>
                                    {meal.food.map((recipe, recipeIdx) => (
                                      <li
                                        key={`food-field-${recipe._id}-${recipeIdx}`}
                                      >
                                        <RestaurantMenuIcon
                                          className={classes.foodIcon}
                                        />
                                        <AutocompleteField
                                          value={recipe}
                                          toggleOpen={toggleOpenNewRecipeDialog}
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
                                        <RoundButton
                                          type="deleteField"
                                          handleClick={() =>
                                            handleDeleteFood(mealIdx, recipeIdx)
                                          }
                                        />
                                        <RoundButton
                                          type="addField"
                                          handleClick={() =>
                                            handleAddFood(mealIdx, recipeIdx)
                                          }
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className={classes.itemAction}>
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
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardBody>
        </Paper>
      ))}
    </div>
  );
};

export default DayList;
