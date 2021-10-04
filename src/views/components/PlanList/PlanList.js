import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { Paper, IconButton } from '@material-ui/core';

import { getPlanList, deletePlan } from '../../../redux/actions/planActions';
import Spinner from '../../common/Spinner/Spinner';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
          {plans.map((plan, idx) => {
            return (
              <li
                key={`item-${idx}`}
                // className={`${classes.item} ${item._id === selectedPlan ? classes.selected : null}`}
                // onClick={handleSelectPlan(plan_id)}
              >
                {/* {item.icon && <div className={classes.itemIcon}>{item.icon}</div>}
                <div className={classes.itemContent}>{item.content}</div>
                <div className={classes.itemAction}>{item.action}</div> */}
                {plan.planName}
                <IconButton onClick={() => handleDeletePlan(plan._id)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
        </ul>
      </div>
    </Paper>
  ) : (
    <Spinner />
  );
};

export default PlanList;
