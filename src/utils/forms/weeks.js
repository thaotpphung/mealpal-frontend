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
    label: 'Calo Goal',
    required: true,
    type: 'number',
    step: 0.01,
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
