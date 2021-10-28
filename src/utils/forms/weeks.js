export const weekFormFields = [
  {
    name: 'weekName',
    label: 'Name',
    required: true,
  },
  {
    name: 'weekDescription',
    label: 'Description',
    required: false,
  },
  {
    name: 'caloGoal',
    label: 'Calories Goal',
    required: true,
    type: 'number',
  },
  {
    name: 'weekDiet',
    label: 'Diet',
    required: true,
  },
  {
    name: 'planTag',
    label: 'Plan Tag',
    required: false,
  },
];

export const getInitialWeekForm = (isPrefilled, week = {}) => {
  return {
    weekName: isPrefilled ? week.weekName : '',
    weekDescription: isPrefilled ? week.weekDescription : '',
    caloGoal: isPrefilled ? week.caloGoal : '',
    weekDiet: isPrefilled ? week.weekDiet : '',
    planTag: isPrefilled ? week.planTag : '',
  };
};
