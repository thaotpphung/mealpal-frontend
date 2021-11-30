import React from 'react';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Typography, Grid, Paper, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useArray from '../../../utils/hooks/useArray';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import Input from '../../common/Input/Input';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import IconWithTooltip from '../../common/IconWithTooltip/IconWithTooltip';
import RoundButton from '../../common/Buttons/RoundButton';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import { validate } from '../../../utils/validations/validate';
import { validateArray } from '../../../utils/validations/validateFunctions';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import unitOptions from '../../../constants/units';

const IngredientCard = ({ recipe }) => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);

  const initialIngredient = {
    amount: {
      whole: 0,
      numer: 0,
      denom: 1,
      toString: '',
    },
    unit: { label: 'none' },
    ingredientName: '',
    calPerUnit: 0,
  };
  const {
    array: ingredients,
    remove: handleDeleteIngredient,
    update: handleChangeIngredient,
    addAt: handleAddIngredient,
    reset: resetIngredients,
  } = useArray(
    recipe.ingredients.length === 0
      ? [{ ...initialIngredient }]
      : recipe.ingredients
  );

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

  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      resetIngredients();
    }
  );
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients }));
    toggleOpenEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    const regex = /^\d{1,3}(?: [1-9]\d{0,2}\/[1-9]\d{0,2})?$/;
    validateArray('ingredients', ingredients, errors, (item) => {
      return (
        !item.amount.toString.trim() ||
        !regex.test(item.amount.toString.trim()) ||
        !item.unit.label ||
        !item.ingredientName ||
        item.ingredientName.trim() === ''
      );
    });
    if (Object.keys(errors).length === 0) {
      ingredients.forEach((ingredient, idx) => {
        let amount = {
          whole: ingredient.amount.toString.split(' ')[0],
          numer: 0,
          denom: 1,
          toString: ingredient.amount.toString.split(' ')[0],
        };
        if (ingredient.amount.toString.split(' ').length > 1) {
          amount.numer = ingredient.amount.toString.split(' ')[1].split('/')[0];
          amount.denom = ingredient.amount.toString.split(' ')[1].split('/')[1];
          amount.toString = `${amount.whole} ${amount.numer}/${amount.denom}`;
        }
        ingredients[idx].amount = amount;
      });
    }
    handleSubmit(event, errors);
  };

  const handleChangeIngredientEntry = (idx, item, key, value) => {
    handleChangeIngredient(idx, { ...item, [key]: value });
  };

  return (
    <Paper className={localClasses.notePaper}>
      <CardHeader
        title="Ingredients"
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
              <li
                className={localClasses.notePaperItem}
                key={`$item-field-${itemIdx}`}
              >
                <div className={classes.itemIcon}>
                  <Typography>{itemIdx + 1}.</Typography>
                </div>
                <div className={localClasses.itemContent}>
                  <>
                    {!openEditMode ? (
                      <>
                        <Typography>
                          {/* {formatMixedNumber(item.amount)} */}
                          {item.amount.toString}
                          {'\u00A0'}
                          {item.unit.label !== 'none' && item.unit.label}{' '}
                          <strong>{item.ingredientName}</strong>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={8} lg={4}>
                            <Input
                              InputLabelProps={{
                                style: { pointerEvents: 'auto' },
                              }}
                              label={
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  Amount&nbsp;
                                  <IconWithTooltip title="Format: Number (Ex: 1) or Number Fraction (ex: 1 1/2)" />
                                </div>
                              }
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
                              error={
                                errors.ingredients &&
                                errors.ingredients[itemIdx]
                              }
                            />
                          </Grid>
                          <Grid item xs={4} lg={3}>
                            <AutocompleteField
                              label="Unit"
                              value={item.unit.label}
                              toggleOpen={toggleOpenDialog}
                              setDialogValue={setNewUnit}
                              handleChangeAutocompleteField={
                                handleChangeIngredientEntry
                              }
                              param="label"
                              options={unitOptions}
                              changedParams={[itemIdx, item, 'unit']}
                              error={
                                errors.ingredients &&
                                errors.ingredients[itemIdx]
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={5}>
                            <Input
                              label="Ingredient"
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
                                errors.ingredients &&
                                errors.ingredients[itemIdx]
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={5}>
                            <Input
                              label="Calories/Unit"
                              type="numer"
                              step={1}
                              value={item.calPerUnit}
                              handleChange={(event) => {
                                const { value } = event.target;
                                if (
                                  value % 1 === 0 &&
                                  value >= 0 &&
                                  value <= 100000
                                ) {
                                  handleChangeIngredientEntry(
                                    itemIdx,
                                    item,
                                    'calPerUnit',
                                    value
                                  );
                                }
                              }}
                              error={
                                errors.ingredients &&
                                errors.ingredients[itemIdx]
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
    </Paper>
  );
};

export default IngredientCard;
