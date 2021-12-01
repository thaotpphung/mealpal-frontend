export const processIngredients = (ingredients) => {
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
  return ingredients;
};
