/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { Paper, IconButton } from '@material-ui/core';
import Spinner from '../../common/Spinner/Spinner';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getPlanList, deletePlan } from '../../../redux/actions/planActions';
import { setSelectedPlan } from '../../../redux/actions/selectActions';

const PlanList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error, plans } = useSelector((state) => state.planList);
  const { selectedPlan } = useSelector((state) => state.select);

  useEffect(() => {
    dispatch(getPlanList());
  }, []);

  const handleSelectPlan = (plan) => {
    dispatch(setSelectedPlan(plan));
  };

  const handleDeletePlan = (planId) => {
    dispatch(deletePlan(planId));
  };

  const handleEditPlan = (planId) => {
    dispatch(deletePlan(planId));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error}</div>
  ) : plans ? (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>Plan List</div>
        <div className={classes.action}>
          <IconButton onClick={() => history.push('/plans/new')}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {Object.values(plans).map((plan, index) => (
            <li
              key={plan._id}
              className={`${classes.item} ${
                plan._id === selectedPlan.id ? classes.selected : null
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              <div className={classes.itemIcon}>icon</div>
              <div className={classes.itemContent}>{plan.planName}</div>
              <div className={classes.itemAction}>
                <IconButton onClick={() => handleEditPlan(plan._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeletePlan(plan._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  ) : (
    <Spinner />
  );
};

export default PlanList;
