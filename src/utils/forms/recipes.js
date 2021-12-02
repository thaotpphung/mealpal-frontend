import IconWithTooltip from '../../views/common/IconWithTooltip/IconWithTooltip';

export const recipeFormFields = [
  {
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    required: false,
  },
  {
    name: 'calories',
    label: 'Calories',
    required: true,
    type: 'number',
  },
  {
    name: 'time',
    label: 'Time',
    required: false,
  },
  {
    name: 'servings',
    label: 'Servings',
    required: false,
    type: 'number',
    step: 1,
  },
  {
    name: 'servingSize',
    label: 'Serving Size',
    required: false,
  },
];

export const getInitialRecipeForm = (isPrefilled, recipe = {}) => {
  return {
    name: isPrefilled ? recipe.name : '',
    description: isPrefilled ? recipe.description : '',
    calories: isPrefilled ? recipe.calories : 0,
    time: isPrefilled ? recipe.time : '',
    servings: isPrefilled ? recipe.servings : 0,
    servingSize: isPrefilled ? recipe.servingSize : '',
  };
};
