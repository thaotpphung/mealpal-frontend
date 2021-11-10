import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Typography, Paper } from '@material-ui/core';
import Input from '../../common/Input/Input';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import RoundButton from '../../common/Buttons/RoundButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useArray from '../../../utils/hooks/useArray';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import { validateArray } from '../../../utils/validations/validateFunctions';
import { updateRecipe } from '../../../redux/actions/recipeActions';

const InstructionCard = ({ recipe }) => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    array: instructions,
    addAt: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
    reset: resetInstructions,
    setArray: setInstructions,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      resetInstructions();
    }
  );
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { instructions }));
    toggleOpenEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    validateArray('instructions', instructions, errors);
    handleSubmit(event, errors);
  };

  const handleOnDragEnd = (result) => {
    const instructions = [...instructions];
    const [reorderedItem] = instructions.splice(result.source.index, 1);
    instructions.splice(result.destination.index, 0, reorderedItem);
    setInstructions(instructions);
  };

  return (
    <Paper className={localClasses.notePaper}>
      <CardHeader
        title="Instructions"
        action={
          <div>
            {loggedInUser && recipe.userId._id === loggedInUser._id && (
              <>
                {openEditMode ? (
                  <>
                    <RoundButton
                      type="cancel"
                      handleClick={handleCloseEditMode}
                    />
                    <RoundButton
                      type="done"
                      handleClick={handleSubmitUpdateRecipe}
                    />
                  </>
                ) : (
                  <RoundButton type="edit" handleClick={toggleOpenEditMode} />
                )}
              </>
            )}
          </div>
        }
      />
      <CardBody>
        {!openEditMode && (
          <ul>
            {instructions.map((item, itemIdx) => (
              <li
                key={`$item-field-${itemIdx}`}
                className={localClasses.notePaperItem}
              >
                <div className={classes.itemIcon}>
                  <Typography>{itemIdx + 1}.</Typography>
                </div>
                <div className={classes.itemContent}>
                  <Typography>{item}</Typography>
                </div>
              </li>
            ))}
          </ul>
        )}
        {openEditMode && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="instructions">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {instructions.map((item, itemIdx) => {
                    return (
                      <Draggable
                        key={`$item-edit-field-${itemIdx}`}
                        draggableId={`${itemIdx}`}
                        index={itemIdx}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={localClasses.notePaperItem}
                          >
                            <div className={classes.itemIcon}>
                              {itemIdx + 1}.
                            </div>
                            <div className={classes.itemContent}>
                              <Input
                                label="Step"
                                value={item}
                                handleChange={(event) =>
                                  handleChangeInstruction(
                                    itemIdx,
                                    event.target.value
                                  )
                                }
                                error={errors && errors[itemIdx]}
                              />
                            </div>
                            <div className={classes.itemAction}>
                              <RoundButton
                                type="addField"
                                handleClick={() =>
                                  handleAddInstruction(itemIdx, '')
                                }
                              />
                              <RoundButton
                                type="deleteField"
                                handleClick={() =>
                                  handleDeleteInstruction(itemIdx)
                                }
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardBody>
    </Paper>
  );
};

export default InstructionCard;
