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
    <Paper className={classes.notePaper}>
      <CardHeader
        title="Instruction List"
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
          {array.map((instruction, instructionIdx) => {
            return (
              <li
                className={classes.notePaperItem}
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
