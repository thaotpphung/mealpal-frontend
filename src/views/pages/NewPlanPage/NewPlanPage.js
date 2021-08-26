import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import useStyles from "./styles";
import {
  Backdrop,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import Menu from "../../components/Menu/Menu";
import {
  plans,
  currentPlan,
  weeks,
  currentWeek,
  currentWeekDetails,
} from "../../../constants/data";
import EditIcon from "@material-ui/icons/Edit";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import { createPlan } from "../../../redux/actions/planActions";
import Spinner from "../../common/Spinner/Spinner";

const NewPlanPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, success, error, plans } = useSelector(state => state.planList);

  const [initialPlan, setInitialPlan] = useState({
    planName: 'test',
    planDescription: 'test',
    planTags: ['test', 'test'],
  })

  const { planName, planDescription, planTags } = initialPlan;

  const handleSubmitInitialPlan = async (e) => {
    e.preventDefault();
    dispatch(createPlan(initialPlan, history));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = name === 'planTags' ? value.split(',') : value;
    setInitialPlan({ ...initialPlan, [name]: formattedValue });
  };

  return (loading ? <Spinner/> : error ? <div>{error}</div> :
    <div>
      <Typography variant="h3">Create New Plan Form</Typography>
      <div className={classes.formRow}>
        <Typography>Plan Name</Typography>
        <div>
          <TextField
            variant="outlined"
            name="planName"
            value={planName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.formRow}>
        <Typography>Plan Description</Typography>
        <div>
          <TextField 
            variant="outlined" 
            name="planDescription"
            value={planDescription}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.formRow}>
        <Typography>Plan Categories</Typography>
        <div>
          <TextField 
            variant="outlined" 
            name="planTags"
            value={planTags}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleSubmitInitialPlan}
      >
        Submit
      </Button>
      
    </div>
  );
};

export default NewPlanPage;
