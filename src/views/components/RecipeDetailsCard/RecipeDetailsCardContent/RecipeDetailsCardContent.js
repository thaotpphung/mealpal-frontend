import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../../../../containers/styles';
import Input from '../../../common/Input/Input';
import RoundButton from '../../../common/Buttons/RoundButton';

const RecipeDetailsCard = ({
  title,
  array,
  handleChange,
  handleDelete,
  handleAdd,
  isInEditMode,
  errors,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.recipeDetailsCardContent}>
      <Typography className={classes.recipeDetailsHeader}>{title}</Typography>
      <ul>
        {array.map((item, itemIdx) => {
          return (
            <li
              className={classes.notePaperItem}
              key={`${title}-item-field-${item}-${itemIdx}`}
            >
              {!isInEditMode ? (
                <>
                  <div className={classes.itemIcon}>{itemIdx + 1}.</div>
                  <div className={classes.itemContent}> {item}</div>
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
                      type="deleteField"
                      handleClick={() => handleDelete(itemIdx)}
                    />
                    <RoundButton
                      type="addField"
                      handleClick={() => handleAdd('')}
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

export default RecipeDetailsCard;
