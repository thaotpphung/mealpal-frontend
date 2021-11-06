export const recipeFormFields = [
  {
    name: 'recipeName',
    label: 'Name',
    required: true,
  },
  {
    name: 'recipeDescription',
    label: 'Description',
    required: false,
  },
  {
    name: 'calories',
    label: 'Calories',
    required: true,
    type: 'number',
    step: 0.01,
  },
  {
    name: 'recipeDiet',
    label: 'Diet',
    required: true,
  },
  {
    name: 'time',
    label: 'Time(mins)',
    required: false,
    type: 'number',
  },
  {
    name: 'servings',
    label: 'Servings',
    required: false,
    type: 'number',
  },
  {
    name: 'servingSize',
    label: 'Serving Size',
    required: false,
  },
];

export const getInitialRecipeForm = (isPrefilled, recipe = {}) => {
  return {
    recipeName: isPrefilled ? recipe.recipeName : '',
    recipeDescription: isPrefilled ? recipe.recipeDescription : '',
    calories: isPrefilled ? recipe.calories : '',
    recipeDiet: isPrefilled ? recipe.recipeDiet : '',
    time: isPrefilled ? recipe.time : '',
    servings: isPrefilled ? recipe.servings : '',
    servingSize: isPrefilled ? recipe.servingSize : '',
  };
};
