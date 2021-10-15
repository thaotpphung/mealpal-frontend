import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from './styles';
import Input from '../../common/Input/Input';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';

import RoundButton from '../../common/Buttons/RoundButton';

const InstructionsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { array, push, remove, update } = useArray(
    recipe.instructions.length === 0 ? [''] : recipe.instructions
  );
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);

  const handleSubmitUpdateRecipe = () => {
    dispatch(updateRecipe(recipe._id, { instructions: array }));
    toggleIsInEditMode(false);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>Instruction List</div>
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
          {array.map((instruction, instructionIdx) => {
            return (
              <li
                className={classes.item}
                key={`instruction-field-${instruction}-${instructionIdx}`}
              >
                {!isInEditMode ? (
                  <>
                    <div className={classes.itemIcon}>
                      {instructionIdx + 1}.
                    </div>
                    <div className={classes.itemContent}> {instruction}</div>
                  </>
                ) : (
                  <>
                    <div className={classes.itemIcon}>
                      {instructionIdx + 1}.
                    </div>
                    <div className={classes.itemContent}>
                      <Input
                        value={instruction}
                        handleChange={(event) =>
                          update(instructionIdx, event.target.value)
                        }
                      />
                    </div>
                    <div className={classes.itemAction}>
                      <RoundButton
                        type="deleteField"
                        handleClick={() => remove(instructionIdx)}
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

export default InstructionsCard;
