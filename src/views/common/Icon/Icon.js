import React from 'react';

import useStyles from './styles';

const Icon = ({ type }) => {
  const classes = useStyles();

  const iconTypes = {
    delete: <DeleteIcon />,
  };

  return iconTypes[type];
};

export default Icon;
