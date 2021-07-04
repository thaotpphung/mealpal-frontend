import React, { useState, useEffec } from "react";
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

const plans = [
  {
    name: "plan1",
    details: [
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
    details: [
      {
        title: "Tuesday",
        meal: [
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

const Plans = () => {
  const [spacing, setSpacing] = React.useState(3);
  const classes = useStyles();
  const history = useHistory();
  const handleAddNewPlan = () => {
    history.push("/plans/new");
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel>Meal Plans</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={plans[0].name}
        >
          {plans.map((plan) => (
            <MenuItem key={plan.name} value={plan.name}>{plan.name}</MenuItem>
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
      
      <Plan 
        planName={plans[0].name}
        details={plans[0].details}
      />

    </Container>
  );
};

export default Plans;
