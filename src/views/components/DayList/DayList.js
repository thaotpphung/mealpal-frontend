import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import {
  Paper,
  TextField,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CardHeader from '../../common/CardHeader/CardHeader';
import RoundButton from '../../common/Buttons/RoundButton';
import useForm from '../../../utils/hooks/useForm';
import useDialog from '../../../utils/hooks/useDialog';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import { validate } from '../../../utils/validations/validate';
import { createRecipe } from '../../../redux/actions/recipeActions';
import { updateWeekByDay } from '../../../redux/actions/weekActions';
import cloneDeep from 'lodash/cloneDeep';

const DayList = ({ days, recipes }) => {
  const classes = useStyles();
  const { weekId } = useParams();
  const localClasses = styles();
  const dispatch = useDispatch();
  const [isInEditDayMode, setIsInEditDayMode] = useState([]);
  const defaultEditDayMode = new Array(days.length).fill(false);
  const [dayForm, setDayForm] = useState({});
  const extractedFieldsForAutoComplete = Object.values(recipes).map(
    (recipe) => {
      return {
        recipeName: recipe.recipeName,
        _id: recipe._id,
      };
    }
  );

  const initialRecipe = {
    recipeName: '',
    _id: '',
    calories: 0,
  };
  // new recipe dialog form
  const {
    open: openNewRecipeDialog,
    toggleOpen: toggleOpenNewRecipeDialog,
    handleClose: handleCloseNewRecipeDialog,
  } = useDialog(() => resetNewRecipe());
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
    },
    validate
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
  // validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dayIdx, setDayIdx] = useState('');
  const handleSubmitUpdateDay = (dayIdx) => {
    let currentErrors = {};
    dayForm.meals.forEach((meal, mealIdx) => {
      if (meal.mealName.trim() === '') currentErrors[`meal${mealIdx}`] = '';
      meal.food.forEach((recipe, recipeIdx) => {
        if (recipe.recipeName.trim() === '')
          currentErrors[`meal${mealIdx}food${recipeIdx}`] = '';
      });
    });
    setErrors(currentErrors);
    setIsSubmitting(true);
    setDayIdx(dayIdx);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      dispatch(updateWeekByDay(weekId, dayIdx, dayForm));
    }
  }, [errors]);
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
      {Object.values(days).map((day, dayIdx) => (
        <Paper key={`day-card-${day._id}-${dayIdx}`}>
          <CardHeader
            title={day.dayName}
            action={
              isInEditDayMode[dayIdx] ? (
                <>
                  <RoundButton
                    type="cancel"
                    handleClick={() => handleCancelEditDayMode(dayIdx)}
                  />
                  <RoundButton
                    type="done"
                    handleClick={() => handleSubmitUpdateDay(dayIdx)}
                  />
                </>
              ) : (
                <RoundButton
                  type={isInEditDayMode[dayIdx] ? 'cancel' : 'edit'}
                  handleClick={() => handleEnableEditDayMode(dayIdx)}
                />
              )
            }
          />
          <div className={localClasses.content}>
            {!isInEditDayMode[dayIdx] &&
              day.meals.map((meal, mealIdx) => {
                return (
                  <div
                    key={`meal-in-day-card-${meal._id}-${dayIdx}-${mealIdx}}`}
                    className={localClasses.menuItem}
                  >
                    <div className={classes.itemIcon}>
                      <Typography>{meal.mealName}</Typography>
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
                                    style={{ marginRight: '8px' }}
                                  />
                                  <Link
                                    to={{ pathname: `/recipes/${recipe._id}` }}
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
                  </div>
                );
              })}
            {isInEditDayMode[dayIdx] &&
              dayForm !== undefined &&
              dayForm.meals.map((meal, mealIdx) => {
                return (
                  <div
                    key={`meal-in-field-${meal._id}-${mealIdx}`}
                    className={localClasses.menuItem}
                  >
                    <div className={classes.itemIcon}>
                      <Input
                        value={meal.mealName}
                        handleChange={(e) => handleChangeMeal(e, mealIdx)}
                        error={errors[`meal${mealIdx}`]}
                      />
                    </div>
                    <div className={classes.itemContent}>
                      <ul className={localClasses.menuContent}>
                        {meal.food.map((recipe, recipeIdx) => (
                          <li key={`food-field-${recipe._id}-${recipeIdx}`}>
                            <RestaurantMenuIcon />
                            <AutocompleteField
                              value={recipe}
                              toggleOpen={toggleOpenNewRecipeDialog}
                              setDialogValue={setNewRecipe}
                              handleChangeAutocompleteField={handleChangeFood}
                              param="recipeName"
                              options={extractedFieldsForAutoComplete}
                              changedIndices={[mealIdx, recipeIdx]}
                              error={errors[`meal${mealIdx}food${recipeIdx}`]}
                              style={{ minWidth: 300 }}
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
                      <>
                        <RoundButton
                          type="delete"
                          handleClick={() => handleDeleteMeal(mealIdx)}
                        />
                        <RoundButton
                          type="add"
                          handleClick={() => handleAddMeal(mealIdx)}
                        />
                      </>
                    </div>
                  </div>
                );
              })}
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default DayList;
