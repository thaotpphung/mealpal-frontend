import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import Input from '../../common/Input/Input';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import RoundButton from '../../common/Buttons/RoundButton';
import CardHeader from '../../common/CardHeader/CardHeader';

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
    <Paper className={classes.notePaper}>
      <CardHeader
        title="Ingredient List"
        action={
          isInEditMode ? (
            <RoundButton
              type="done"
              handleClick={() => handleSubmitUpdateRecipe()}
            />
          ) : (
            <RoundButton type="edit" handleClick={() => toggleIsInEditMode()} />
          )
        }
      />

      <div className={classes.content}>
        <ul>
          {array.map((ingredient, ingredientIdx) => {
            return (
              <li
                className={classes.notePaperItem}
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
