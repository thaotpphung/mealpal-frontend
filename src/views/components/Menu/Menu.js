import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import useStyles from './styles';
import { Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { getDayListByWeekId } from '../../../redux/actions/dayActions';

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedWeek } = useSelector((state) => state.select);
  const { days } = useSelector((state) => state.dayList);

  useEffect(() => {
    dispatch(getDayListByWeekId(selectedWeek.id));
  }, [selectedWeek.id]);

  return (
    <div>
      {Object.values(days).map((day, dayIdx) => (
        <Paper key={`day-card-${dayIdx}`} className={classes.root}>
          <div className={classes.header}>
            <div>{day.dayName}</div>
            <Link to={{ pathname: `/days/${day._id}/edit` }}>
              <EditIcon />
            </Link>
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
      ))}
    </div>
  );
};

export default Menu;
