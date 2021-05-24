import React from "react";
import useStyles from "./styles";
import CustomCard from "../../components/Card/Card";
import { Container } from "@material-ui/core";

const plans = [
  {
    day: 'Monday',
    dishes: [
      {
        name: "Cabbage",
        url: "http"
      }
    ]
  },
  {
    day: 'Monday',
    dishes: [
      {
        name: "Cabbage",
        url: "http"
      }
    ]
  },
  {
    day: 'Monday',
    dishes: [
      {
        name: "Cabbage",
        url: "http"
      }
    ]
  }
]

const PlanPage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      {plans.map((plan) => {
        return (
          <CustomCard className={classes.card}/>
        )
      })}
    </Container>
  );
};

export default PlanPage;
