import IconWithTooltip from '../../views/common/IconWithTooltip/IconWithTooltip';

export const weekFormFields = [
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
    label: 'Calories/Day',
    required: true,
    type: 'number',
    step: 0.01,
  },
];

export const getInitialWeekForm = (isPrefilled, week = {}) => {
  return {
    name: isPrefilled ? week.name : '',
    description: isPrefilled ? week.description : '',
    calories: isPrefilled ? week.calories : 0,
  };
};
