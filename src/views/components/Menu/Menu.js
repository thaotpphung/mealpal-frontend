import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { IconButton, Paper, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@mui/icons-material/Done';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { getDayListByWeekId } from '../../../redux/actions/dayActions';

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedWeek } = useSelector((state) => state.select);
  const { days } = useSelector((state) => state.dayList);
  const [isEditMealMode, setIsEditMealMode] = useState(false);

  useEffect(() => {
    dispatch(getDayListByWeekId(selectedWeek.id));
  }, [selectedWeek.id]);

  const handleEnableEditMealMode = () => {
    setIsEditMealMode(true);
  };

  const handleDisableEditMealMode = () => {
    setIsEditMealMode(false);
  };

  const handleAddMeal = (dayId) => {
    console.log(dayId);
  };

  return (
    <div>
      {Object.values(days).map((day, dayIdx) => (
        <Paper key={`day-card-${dayIdx}`} className={classes.root}>
          <div className={classes.header}>
            <div>{day.dayName}</div>
            {isEditMealMode ? (
              <IconButton
                className={classes.action}
                onClick={handleDisableEditMealMode}
              >
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.action}
                onClick={handleEnableEditMealMode}
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.content}>
            {day.meals.map((meal, mealIdx) => {
              return (
                <div
                  key={`meal-in-day-card-${mealIdx}`}
                  className={classes.item}
                >
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
                    {isEditMealMode && (
                      <EditIcon onClick={handleEnableEditMealMode} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {isEditMealMode && (
            <div>
              <TextField variant="outlined" />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleAddMeal(day._id)}
              >
                + Add Meal
              </Button>
            </div>
          )}
        </Paper>
      ))}
    </div>
  );
};

export default Menu;
