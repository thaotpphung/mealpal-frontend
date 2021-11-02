import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../../../../containers/styles';
import { styles } from '../styles';
import Input from '../../../common/Input/Input';
import useForm from '../../../../utils/hooks/useForm';
import useDialog from '../../../../utils/hooks/useDialog';
import AutocompleteField from '../../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../../common/PopupDialog/PopupDialog';
import RoundButton from '../../../common/Buttons/RoundButton';
import { validate } from '../../../../utils/validations/validate';

const IngredientCard = ({
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
  const {
    open: openDialog,
    toggleOpen: toggleOpenDialog,
    handleClose: handleCloseDialog,
  } = useDialog(() => resetNewUnit());

  const {
    handleChange: handleChangeUnit,
    handleSubmit: handleSubmitCreateUnit,
    values: newUnit,
    setValue: setNewUnit,
    reset: resetNewUnit,
    errors: newUnitErrors,
  } = useForm(
    { label: '' },
    (unit) => {
      unitOptions.push({ label: unit });
      handleCloseDialog();
    },
    validate
  );

  const handleCreateUnit = (event, unit) => {
    handleSubmitCreateUnit(event, {}, [unit]);
  };

  return (
    <div className={localClasses.recipeDetailsCardContent}>
      <PopupDialog
        title="Add a new unit"
        content={
          <div className={classes.formPaper}>
            <Input
              name="label"
              label="Unit"
              handleChange={handleChangeUnit}
              value={newUnit.label}
              error={newUnitErrors.label}
              required
            />
          </div>
        }
        handleSubmit={(event) => handleCreateUnit(event, newUnit.label)}
        open={openDialog}
        handleClose={handleCloseDialog}
      />
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
              <div className={classes.itemIcon}>
                <Typography>{itemIdx + 1}.</Typography>
              </div>
              <div className={localClasses.itemContent}>
                <>
                  {!isInEditMode ? (
                    <>
                      <Typography>
                        {item.amount} {item.unit.label} {item.food}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                          <Input
                            type="number"
                            value={item.amount}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'amount',
                                event.target.value
                              )
                            }
                            // error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <AutocompleteField
                            value={item.unit.label}
                            toggleOpen={toggleOpenDialog}
                            setDialogValue={setNewUnit}
                            handleChangeAutocompleteField={handleChange}
                            param="label"
                            options={unitOptions}
                            changedIndices={[itemIdx, item, 'unit']}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Input
                            value={item.food}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'food',
                                event.target.value
                              )
                            }
                            // error={errors && errors[itemIdx]}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
                </>
              </div>
              {isInEditMode && (
                <div className={classes.itemAction}>
                  <RoundButton
                    type="addField"
                    handleClick={() =>
                      handleAdd(itemIdx, {
                        amount: 0,
                        unit: '',
                        food: '',
                      })
                    }
                  />
                  <RoundButton
                    type="deleteField"
                    handleClick={() => handleDelete(itemIdx)}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const unitOptions = [
  {
    label: 'kg',
  },
  {
    label: 'gr',
  },
  {
    label: 'cup',
  },
];

export default IngredientCard;
