import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../../../../app/styles';
import { styles } from '../styles';
import Input from '../../../common/Input/Input';
import RoundButton from '../../../common/Buttons/RoundButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const InstructionCard = ({
  title,
  array,
  handleChange,
  handleDelete,
  handleAdd,
  openEditMode,
  errors,
  setInstructions,
}) => {
  const classes = useStyles();
  const localClasses = styles();

  const handleOnDragEnd = (result) => {
    const instructions = [...array];
    const [reorderedItem] = instructions.splice(result.source.index, 1);
    instructions.splice(result.destination.index, 0, reorderedItem);
    setInstructions(instructions);
  };

  return (
    <div className={localClasses.recipeDetailsCardContent}>
      <Typography className={localClasses.recipeDetailsHeader}>
        {title}
      </Typography>
      {!openEditMode && (
        <ul>
          {array.map((item, itemIdx) => (
            <li
              key={`${title}-item-field-${itemIdx}`}
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
                {array.map((item, itemIdx) => {
                  return (
                    <Draggable
                      key={`${title}-item-field-${itemIdx}`}
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
                          <div className={classes.itemIcon}>{itemIdx + 1}.</div>
                          <div className={classes.itemContent}>
                            <Input
                              label="Step"
                              value={item}
                              handleChange={(event) =>
                                handleChange(itemIdx, event.target.value)
                              }
                              error={errors && errors[itemIdx]}
                            />
                          </div>
                          <div className={classes.itemAction}>
                            <RoundButton
                              type="addField"
                              handleClick={() => handleAdd(itemIdx, '')}
                            />
                            <RoundButton
                              type="deleteField"
                              handleClick={() => handleDelete(itemIdx)}
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
    </div>
  );
};

export default InstructionCard;
