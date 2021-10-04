/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { Paper, IconButton } from '@material-ui/core';

import { getPlanList, deletePlan } from '../../../redux/actions/planActions';
import Spinner from '../../common/Spinner/Spinner';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PlanList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error, plans } = useSelector((state) => state.planList);

  useEffect(() => {
    dispatch(getPlanList());
  }, []);

  // const handleSelectPlan = (e, planId) => {
  //   dispatch(setSelectedPlan(planId));
  // };

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
            <li key={plan._id} className={`${classes.item}`}>
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
              {console.log(plan)}
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
