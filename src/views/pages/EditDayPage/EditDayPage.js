import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { IconButton, Paper, TextField, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createMeal, deleteMeal } from '../../../redux/actions/mealActions';

const EditDayPage = (day) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newMealName, setNewMealName] = useState('');
  const { dayId } = useParams();
  const { days } = useSelector((state) => state.dayList);

  const handleDeleteMeal = (mealId) => {
    dispatch(deleteMeal(mealId, dayId));
  };

  const handleChangeNewMealName = (event) => {
    setNewMealName(event.target.value);
  };

  const handleSubmitAddMeal = () => {
    dispatch(createMeal({ mealName: newMealName, dayId: dayId }));
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>{days[dayId].dayName}</div>
      </div>
      <div className={classes.content}>
        {days[dayId].meals.map((meal, mealIdx) => {
          return (
            <div key={`meal-in-day-card-${mealIdx}`} className={classes.item}>
              <div className={classes.itemIcon}>{meal.mealName}</div>
              <div className={classes.itemContent}>
                <ul className={classes.menu}>
                  {meal.food.map((recipe, recipeIdx) => {
                    return (
                      <li key={`dish-in-meal-${recipeIdx}`}>
                        <RestaurantMenuIcon />
                        <span>{recipe}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={classes.itemAction}>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteMeal(meal._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
        <div>
          <TextField
            variant="outlined"
            value={newMealName}
            onChange={handleChangeNewMealName}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmitAddMeal}
          >
            + Add Meal
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default EditDayPage;
