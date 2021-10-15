import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from './styles';
import Input from '../../common/Input/Input';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import RoundButton from '../../common/Buttons/RoundButton';

const IngredientsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { array, push, remove, update } = useArray(
    recipe.ingredients.length === 0 ? [''] : recipe.ingredients
  );
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);

  const handleSubmitUpdateRecipe = () => {
    dispatch(updateRecipe(recipe._id, { ingredients: array }));
    toggleIsInEditMode(false);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>Ingredient List</div>
        <div className={classes.action}>
          {isInEditMode ? (
            <RoundButton
              type="done"
              handleClick={() => handleSubmitUpdateRecipe()}
            />
          ) : (
            <RoundButton type="edit" handleClick={() => toggleIsInEditMode()} />
          )}
        </div>
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {array.map((ingredient, ingredientIdx) => {
            return (
              <li
                className={classes.item}
                key={`ingredient-field-${ingredient}-${ingredientIdx}`}
              >
                {!isInEditMode ? (
                  <>
                    <div className={classes.itemIcon}>{ingredientIdx + 1}.</div>
                    <div className={classes.itemContent}> {ingredient}</div>
                  </>
                ) : (
                  <>
                    <div className={classes.itemIcon}>{ingredientIdx + 1}.</div>
                    <div className={classes.itemContent}>
                      <Input
                        value={ingredient}
                        handleChange={(event) =>
                          update(ingredientIdx, event.target.value)
                        }
                      />
                    </div>
                    <div className={classes.itemAction}>
                      <RoundButton
                        type="deleteField"
                        handleClick={() => remove(ingredientIdx)}
                      />
                      <RoundButton
                        type="addField"
                        handleClick={() => push('')}
                      />
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Paper>
  );
};

export default IngredientsCard;
