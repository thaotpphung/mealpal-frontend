import React, { useState, useEffec } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import CustomCard from "../../common/Card/Card";
import {
  Container,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Plan from "./Plan/Plan";


import { onSelectPlan } from '../../actions/planActions';

const plans = [
  {
    name: "plan1",
    id: 'plan1',
    schedule: [
      {
        title: "Monday",
        meals: [
          {
            title: "Breakfast",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              },
              {
                name: "Cabbage DUO",
                url: "http",
              }
            ]
          },
          {
            title: "Lunch",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          },
          {
            title: "Dinner",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          }
        ]
      },
      {
        title: "Tuesday",
        meals: [
          {
            title: "Breakfast",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          },
          {
            title: "Lunch",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          }
        ]
      },
    ],
  },
  {
    name: "plan2",
    id: 'plan2',
    schedule: [
      {
        title: "Tuesday",
        meals: [
          {
            title: "Breakfast",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          },
          {
            title: "Lunch",
            dishes: [
              {
                name: "Cabbage",
                url: "http",
              }
            ]
          }
        ]
      },
    ],
  },
];

const Plans = ({ selectedPlan, onSelectPlan }) => {
  const [spacing, setSpacing] = React.useState(3);
  const classes = useStyles();
  const history = useHistory();
  const handleAddNewPlan = () => {
    history.push("/plans/new");
  };

  const onSelectedPlanChange = (id) => {
    const newSelectedPlan = plans.find(plan => plan.id === id); // fetch plan by id
    console.log(newSelectedPlan);
    if (newSelectedPlan) {
      onSelectPlan(newSelectedPlan);
    }
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel>Meal Plans</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPlan.id}
          onChange={e => onSelectedPlanChange(e.target.value)}
        >
          {plans.map((plan) => (
            <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        className={classes.button}
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleAddNewPlan}
      >
        New Plan
      </Button>
      
      {selectedPlan && selectedPlan.id ? <Plan 
        planName={selectedPlan.name}
        schedule={selectedPlan.schedule}
      />
      : <h2>Please select a Plan.</h2>}

    </Container>
  );
};

const mapStateToProps = ({ plans }) => ({
  selectedPlan: plans.selectedPlan,
});

const mapDispatchToProps = dispatch => ({
  onSelectPlan: id => dispatch(onSelectPlan(id)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
