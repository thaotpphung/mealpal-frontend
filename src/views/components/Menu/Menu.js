import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { IconButton, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { getDayListByWeekId } from '../../../redux/actions/dayActions';

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { selectedWeek } = useSelector((state) => state.weekList);
  const { days } = useSelector((state) => state.dayList);

  useEffect(() => {
    dispatch(getDayListByWeekId(selectedWeek));
  }, [selectedWeek]);

  // const handleClickEditMeal = (e) => {
  //   console.log('click edit meal');
  // };

  return (
    <div>
      {days.map((day, dayIdx) => {
        return (
          <Paper key={`day-card-${dayIdx}`} className={classes.root}>
            <div className={classes.header}>
              <div>{day.dayName}</div>
              <IconButton
                className={classes.action}
                onClick={() => history.push('/days/edit')}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div className={classes.content}>
              {day.meals.map((meal, mealIdx) => {
                return (
                  <div
                    key={`meal-in-day-card-${mealIdx}`}
                    className={classes.menuMeal}
                  >
                    <div className={classes.menuMealTitle}>{meal.mealName}</div>
                    <div className={classes.menuMealContent}>
                      <ul className={classes.menu}>
                        {meal.food.map((recipe, recipeIdx) => {
                          return (
                            <li key={`dish-in-meal-${recipeIdx}`}>
                              <RestaurantMenuIcon />
                              <span>{recipe.recipeName}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default Menu;
