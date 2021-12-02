import React, { useState } from 'react';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Typography, Grid } from '@material-ui/core';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import Input from '../../common/Input/Input';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import IconWithTooltip from '../../common/IconWithTooltip/IconWithTooltip';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import RoundButton from '../../common/Buttons/RoundButton';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import CardBody from '../../common/CardBody/CardBody';
import { validate } from '../../../utils/validations/validate';
import unitOptions from '../../../constants/units';

const IngredientCard = ({
  ingredients,
  openEditMode,
  handleAddIngredient,
  handleChangeIngredientEntry,
  errors,
  initialIngredient,
  handleDeleteIngredient,
}) => {
  const classes = useStyles();
  const localClasses = styles();

  // unit
  const [newUnitParams, setNewUnitParams] = useState([]);
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
      handleChangeIngredientEntry(...newUnitParams, newUnit);
    },
    validate
  );
  const handleCreateUnit = (event, unit) => {
    handleSubmitCreateUnit(event, {}, [unit]);
  };

  return (
    <>
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
      <CardBody>
        <ul>
          {ingredients.map((item, itemIdx) => {
            return (
              <li className={classes.recipeItem} key={`$item-field-${itemIdx}`}>
                <div className={classes.itemIcon}>
                  <Typography>
                    <strong>{itemIdx + 1}.</strong>
                  </Typography>
                </div>
                <div className={localClasses.itemContent}>
                  <>
                    {!openEditMode ? (
                      <>
                        <Typography>
                          {item.amount.toString}
                          {'\u00A0'}
                          {item.unit.label !== 'none' && item.unit.label}{' '}
                          <strong>{item.ingredientName}</strong>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={8} lg={3}>
                            <InputWithTooltip
                              label="Amount"
                              tooltip="Number (Ex: 1) or Number Fraction (ex: 1 1/2)"
                              value={item.amount.toString}
                              handleChange={(event) => {
                                handleChangeIngredientEntry(
                                  itemIdx,
                                  item,
                                  'amount',
                                  {
                                    ...item.amount,
                                    ['toString']: event.target.value,
                                  }
                                );
                              }}
                              error={errors && errors[`${itemIdx}amount`]}
                            />
                          </Grid>
                          <Grid item xs={4} lg={3}>
                            <AutocompleteField
                              label="Unit"
                              value={item.unit.label}
                              toggleOpen={() => {
                                toggleOpenDialog();
                                setNewUnitParams([itemIdx, item, 'unit']);
                              }}
                              setDialogValue={setNewUnit}
                              handleChangeAutocompleteField={
                                handleChangeIngredientEntry
                              }
                              param="label"
                              options={unitOptions}
                              changedParams={[itemIdx, item, 'unit']}
                            />
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <Input
                              label="Ingredient"
                              required
                              value={item.ingredientName}
                              handleChange={(event) =>
                                handleChangeIngredientEntry(
                                  itemIdx,
                                  item,
                                  'ingredientName',
                                  event.target.value
                                )
                              }
                              error={
                                errors && errors[`${itemIdx}ingredientName`]
                              }
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
                        handleAddIngredient(itemIdx, {
                          ...initialIngredient,
                        })
                      }
                    />
                    <RoundButton
                      type="deleteField"
                      handleClick={() => handleDeleteIngredient(itemIdx)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardBody>
    </>
  );
};

export default IngredientCard;
