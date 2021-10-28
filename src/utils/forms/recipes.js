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
  },
  {
    name: 'recipeDiet',
    label: 'Diet',
    required: true,
  },
  {
    name: 'prepTime',
    label: 'Prep (mins)',
    required: false,
    type: 'number',
  },
  {
    name: 'cookTime',
    label: 'Cook (mins)',
    required: false,
    type: 'number',
  },
];

export const getInitialRecipeForm = (isPrefilled, recipe = {}) => {
  return {
    recipeName: isPrefilled ? recipe.recipeName : '',
    recipeDescription: isPrefilled ? recipe.recipeDescription : '',
    calories: isPrefilled ? recipe.calories : '',
    recipeDiet: isPrefilled ? recipe.recipeDiet : '',
    cookTime: isPrefilled ? recipe.cookTime : '',
    prepTime: isPrefilled ? recipe.prepTime : '',
  };
};
