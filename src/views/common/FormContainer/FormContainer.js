import React from 'react';
// import useStyles from './styles';
import useStyles from '../../../containers/styles';

const FormContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <form className={classes.formContainer}>
      <Grid spacing={2}>{children}</Grid>
    </form>
  );
};

export default FormContainer;
