import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from '../../../../containers/styles';
import { styles } from '../styles';
import Input from '../../../common/Input/Input';
import useForm from '../../../../utils/hooks/useForm';
import useEditMode from '../../../../utils/hooks/useEditMode';
import AutocompleteField from '../../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../../common/PopupDialog/PopupDialog';
import RoundButton from '../../../common/Buttons/RoundButton';
import { validate } from '../../../../utils/validations/validate';
import unitOptions from '../../../../constants/units';

const IngredientCard = ({
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
                        {item.numer % item.denom === 0 ? (
                          <>{item.whole + item.numer / item.denom} </>
                        ) : (
                          <>
                            {item.whole !== 0 && item.whole}{' '}
                            {item.numer !== 0 && item.numer}
                            {item.denom !== 1 && `/${item.denom}`}
                          </>
                        )}
                        {item.unit.label} <strong>{item.food}</strong>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={2}>
                          <Input
                            label="Whole"
                            type="number"
                            step={1}
                            value={item.whole}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'whole',
                                event.target.value
                              )
                            }
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Input
                            label="Numer"
                            type="number"
                            value={item.numer}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'numer',
                                event.target.value
                              )
                            }
                            error={errors && errors[itemIdx]}
                          />
                          <hr />
                          <Input
                            label="Denom"
                            type="number"
                            step={1}
                            value={item.denom}
                            handleChange={(event) =>
                              handleChange(
                                itemIdx,
                                item,
                                'denom',
                                event.target.value
                              )
                            }
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <AutocompleteField
                            label="Unit"
                            value={item.unit.label}
                            toggleOpen={toggleOpenDialog}
                            setDialogValue={setNewUnit}
                            handleChangeAutocompleteField={handleChange}
                            param="label"
                            options={unitOptions}
                            changedIndices={[itemIdx, item, 'unit']}
                            error={errors && errors[itemIdx]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Input
                            label="Food"
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
