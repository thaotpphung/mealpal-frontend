import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Paper, Typography, Chip, Button } from '@material-ui/core';
import { setCurrentPlan } from '../../../redux/actions/userActions';
import { setInitialSelect } from '../../../redux/actions/selectActions';
import StarIcon from '@material-ui/icons/Star';

const PlanPageHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedPlan, selectedWeek } = useSelector((state) => state.select);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      setInitialSelect(currentUser.currentPlan, currentUser.currentWeek)
    );
  }, []);

  const handleClickSetCurrent = () => {
    dispatch(setCurrentPlan(selectedPlan.id, selectedWeek.id));
  };

  return (
    <Paper className={classes.header}>
      <Chip label={<Typography>{selectedPlan.name}</Typography>} />
      <Chip label={<Typography>{selectedWeek.name}</Typography>} />
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
