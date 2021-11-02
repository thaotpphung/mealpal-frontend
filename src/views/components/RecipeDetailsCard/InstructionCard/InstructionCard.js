import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../../../../containers/styles';
import { styles } from '../styles';
import Input from '../../../common/Input/Input';
import RoundButton from '../../../common/Buttons/RoundButton';

const InstructionCard = ({
  title,
  array,
  handleChange,
  handleDelete,
  handleAdd,
  isInEditMode,
  errors,
}) => {
  const classes = useStyles();
  const localClasses = styles();

  return (
    <div className={localClasses.recipeDetailsCardContent}>
      <Typography className={localClasses.recipeDetailsHeader}>
        {title}
      </Typography>
      <ul>
        {array.map((item, itemIdx) => {
          return (
            <li
              className={localClasses.notePaperItem}
              key={`${title}-item-field-${item}-${itemIdx}`}
            >
              {!isInEditMode ? (
                <>
                  <div className={classes.itemIcon}>
                    <Typography>{itemIdx + 1}.</Typography>
                  </div>
                  <div className={classes.itemContent}>
                    <Typography>{item}</Typography>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.itemIcon}>{itemIdx + 1}.</div>
                  <div className={classes.itemContent}>
                    <Input
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
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InstructionCard;
