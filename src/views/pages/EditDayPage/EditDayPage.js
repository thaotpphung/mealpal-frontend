import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { Button, Typography, TextField } from '@material-ui/core';
import { updateDay } from '../../../redux/actions/dayActions';

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dayId } = useParams();
  const { days } = useSelector((state) => state.dayList);

  const [meals, setMeals] = useState(days[dayId].meals);

  const handleAddRecipe = (e, mealIdx) => {
    const updatedFood = [...meals[mealIdx].food, ''];

    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        _id: meals[mealIdx]._id,
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleChangeRecipe = (e, mealIdx, recipeIdx) => {
    const updatedFood = [
      ...meals[mealIdx].food.slice(0, recipeIdx),
      e.target.value,
      ...meals[mealIdx].food.slice(recipeIdx + 1),
    ];

    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        _id: meals[mealIdx]._id,
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleDeleteRecipe = (e, mealIdx, recipeIdx) => {
    const updatedFood = [...meals[mealIdx].food];
    updatedFood.splice(recipeIdx, 1);
    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        _id: meals[mealIdx]._id,
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleSubmit = () => {
    dispatch(updateDay(dayId, meals));
  };

  return (
    <div>
      <Typography variant="h3">Edit Day Form</Typography>
      {meals.map((meal, mealIdx) => (
        <div key={`meal-field=${mealIdx}`} className={classes.row}>
          <Typography>{meal.mealName} </Typography>
          {meal.food.map((recipe, recipeIdx) => (
            <div key={`recipe-field-${recipeIdx}`} className={classes.field}>
              <TextField
                variant="outlined"
                name="recipeField"
                value={recipe}
                onChange={(e) => handleChangeRecipe(e, mealIdx, recipeIdx)}
              />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={(e) => handleDeleteRecipe(e, mealIdx, recipeIdx)}
              >
                - Remove Dish
              </Button>
            </div>
          ))}

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={(e) => handleAddRecipe(e, mealIdx)}
          >
            + Add Another
          </Button>
        </div>
      ))}

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default EditDayPage;
