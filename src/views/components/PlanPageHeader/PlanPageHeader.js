import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Paper, Typography, Chip, Button } from '@material-ui/core';
import { setCurrentPlan } from '../../../redux/actions/userActions';
import StarIcon from '@material-ui/icons/Star';

const PlanPageHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { selectedWeek } = useSelector((state) => state.weekList);
  const { selectedPlan } = useSelector((state) => state.planList);

  const handleClickSetCurrent = () => {
    dispatch(setCurrentPlan(selectedPlan, selectedWeek));
  };

  return (
    <Paper className={classes.header}>
      <Chip label={<Typography>{selectedPlan}</Typography>} />
      <Chip label={<Typography>{selectedWeek}</Typography>} />
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<StarIcon />}
        onClick={handleClickSetCurrent}
      >
        Set Current
      </Button>
    </Paper>
  );
};

export default PlanPageHeader;
