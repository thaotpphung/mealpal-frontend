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
            id="outlined-basic"
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
            id="outlined-basic" 
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
            id="outlined-basic" 
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

      <hr />

      {/* <Typography variant="h4">Weeks</Typography>

      <div className={classes.formRow}>
        <Typography>Week Name</Typography>
        <div className={classes.fieldsContainer}>
          <TextField id="outlined-basic" variant="outlined" />
          <Button variant="outlined" color="primary" className={classes.button}>
            + Add Another
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            - Remove Week
          </Button>
        </div>
      </div>

      <Paper className={classes.root}>
        <div className={classes.header}>
          <div>Monday</div>
          <IconButton className={classes.action}>
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.menuMeal}>
            <div className={classes.menuMealTitle}>Breakfast</div>
            <div className={classes.menuMealContent}>
              <ul className={classes.menu}>
                <li>
                  <RestaurantMenuIcon />
                  <span></span>
                </li>
                <li>
                  <RestaurantMenuIcon />
                  <span>carrot</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Paper> */}

      
    </div>
  );
};

export default NewPlanPage;
