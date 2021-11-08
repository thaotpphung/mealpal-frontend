import React from 'react';
import { Typography, Grid, FormHelperText } from '@material-ui/core';
import useStyles from '../../../../app/styles';
import { styles } from '../styles';
import Input from '../../../common/Input/Input';
import useForm from '../../../../utils/hooks/useForm';
import useEditMode from '../../../../utils/hooks/useEditMode';
import AutocompleteField from '../../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../../common/PopupDialog/PopupDialog';
import RoundButton from '../../../common/Buttons/RoundButton';
import { validate } from '../../../../utils/validations/validate';
import { formatMixedNumber } from '../../../../utils/mixedNumber';
import unitOptions from '../../../../constants/units';

const IngredientCard = ({
  setError,
  title,
  array,
  handleChange,
  handleDelete,
  handleAdd,
  openEditMode,
  errors,
  initialIngredient,
}) => {
  const classes = useStyles();
  const localClasses = styles();
  const {
    openEditMode: openDialog,
    toggleOpenEditMode: toggleOpenDialog,
    handleCloseEditMode: handleCloseDialog,
  } = useEditMode(() => resetNewUnit());

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
      unitOptions.push({ label: unit.toLowerCase() });
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
                  {!openEditMode ? (
                    <>
                      <Typography>
                        {formatMixedNumber(item.amount)}
                        {'\u00A0'}
                        {item.unit.label !== 'none' && item.unit.label}{' '}
                        <strong>{item.food}</strong>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={12}>
                          <FormHelperText error>
                            {errors && errors[itemIdx]}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Input
                            label="Whole"
                            type="number"
                            value={item.amount.whole}
                            handleChange={(event) => {
                              const { value } = event.target;
                              if (
                                value % 1 === 0 &&
                                value >= 0 &&
                                value <= 100000
                              ) {
                                handleChange(itemIdx, item, 'amount', {
                                  ...item.amount,
                                  ['whole']: value,
                                });
                              }
                            }}
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Input
                            label="Numer"
                            type="number"
                            value={item.amount.numer}
                            handleChange={(event) => {
                              const { value } = event.target;
                              if (
                                value % 1 === 0 &&
                                value >= 0 &&
                                value <= 100000
                              ) {
                                handleChange(itemIdx, item, 'amount', {
                                  ...item.amount,
                                  ['numer']: value,
                                });
                              }
                            }}
                            error={errors && errors[itemIdx]}
                          />
                          <hr />
                          <Input
                            label="Denom"
                            type="number"
                            value={item.amount.denom}
                            handleChange={(event) => {
                              const { value } = event.target;
                              if (
                                value % 1 === 0 &&
                                value >= 0 &&
                                value <= 100000
                              ) {
                                handleChange(itemIdx, item, 'amount', {
                                  ...item.amount,
                                  ['denom']: value,
                                });
                              }
                            }}
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <AutocompleteField
                            label="Unit"
                            value={item.unit.label}
                            toggleOpen={toggleOpenDialog}
                            setDialogValue={setNewUnit}
                            handleChangeAutocompleteField={handleChange}
                            param="label"
                            options={unitOptions}
                            changedParams={[itemIdx, item, 'unit']}
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <Input
                            label="Ingredient"
                            value={item.food}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'food',
                                event.target.value
                              )
                            }
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
                </>
              </div>
              {openEditMode && (
                <div className={classes.itemAction}>
                  <RoundButton
                    type="addField"
                    handleClick={() =>
                      handleAdd(itemIdx, {
                        ...initialIngredient,
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

export default IngredientCard;
