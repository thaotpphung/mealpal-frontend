import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useStyles from './styles';
import { IconButton, Paper, TextField, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import {
  createMeal,
  deleteMeal,
  updateMeal,
} from '../../../redux/actions/mealActions';

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newMealName, setNewMealName] = useState('');
  const { dayId } = useParams();
  const { days } = useSelector((state) => state.dayList);
  const dayLength = Object.keys(days).length;
  const [isInEditMealMode, setIsInEditMealMode] = useState(
    new Array(dayLength).fill(false)
  );
  const [foodFields, setFoodFields] = useState([]);

  const handleDeleteMeal = (mealId) => {
    dispatch(deleteMeal(mealId, dayId));
  };

  const handleChangeNewMealName = (event) => {
    setNewMealName(event.target.value);
  };

  const handleSubmitCreateMeal = () => {
    dispatch(createMeal({ mealName: newMealName, dayId: dayId }));
  };

  const handleEnableEditMealMode = (mealIdx, food) => {
    const edits = new Array(dayLength).fill(false);
    edits[mealIdx] = true;
    setIsInEditMealMode(edits);
    setFoodFields(food.length === 0 ? [''] : [...food]);
  };

  const handleSubmitUpdateMeal = (mealId) => {
    const edits = new Array(dayLength).fill(false);
    setIsInEditMealMode(edits);
    dispatch(updateMeal(mealId, foodFields));
  };

  const handleChangeFoodField = (event, recipeIdx) => {
    const fields = [...foodFields];
    fields[recipeIdx] = event.target.value;
    setFoodFields(fields);
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
                  {foodFields.map((recipe, recipeIdx) => {
                    return isInEditMealMode[mealIdx] ? (
                      <li key={`dish-in-meal-${recipeIdx}`}>
                        <RestaurantMenuIcon />
                        <TextField
                          variant="outlined"
                          value={foodFields[recipeIdx]}
                          onChange={(event) =>
                            handleChangeFoodField(event, recipeIdx)
                          }
                        />
                      </li>
                    ) : (
                      <li key={`dish-in-meal-${recipeIdx}`}>
                        <RestaurantMenuIcon />
                        <span>{meal.food[recipeIdx]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={classes.itemAction}>
                {isInEditMealMode[mealIdx] ? (
                  <IconButton onClick={() => handleSubmitUpdateMeal(meal._id)}>
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => handleEnableEditMealMode(mealIdx, meal.food)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
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
            onClick={handleSubmitCreateMeal}
          >
            + Add Meal
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default EditDayPage;
