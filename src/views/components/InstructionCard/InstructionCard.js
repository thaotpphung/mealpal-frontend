import React from 'react';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Typography } from '@material-ui/core';
import Input from '../../common/Input/Input';
import CardBody from '../../common/CardBody/CardBody';
import RoundButton from '../../common/Buttons/RoundButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const InstructionCard = ({
  instructions,
  openEditMode,
  handleOnDragEnd,
  handleChangeInstruction,
  handleAddInstruction,
  handleDeleteInstruction,
  errors,
}) => {
  const classes = useStyles();
  const localClasses = styles();

  return (
    <CardBody>
      {!openEditMode && (
        <ul>
          {instructions.map((item, itemIdx) => (
            <li key={`$item-field-${itemIdx}`} className={classes.recipeItem}>
              <div className={`${classes.itemIcon}`}>
                <Typography>
                  <strong>Step {itemIdx + 1}.</strong>
                </Typography>
              </div>
              <div className={classes.itemContent}>
                <Typography className={localClasses.stepLabel}>
                  {item}
                </Typography>
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
                          className={classes.recipeItem}
                        >
                          <div className={classes.itemIcon}>
                            <Typography>
                              <strong>Step {itemIdx + 1}.</strong>
                            </Typography>
                          </div>
                          <div className={classes.itemContent}>
                            <Input
                              label="Step"
                              value={item}
                              multiline
                              rows={4}
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
  );
};

export default InstructionCard;
