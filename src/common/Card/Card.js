import React from "react";
import useStyles from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const CustomCard = ({ title, meals }) => {
  const classes = useStyles();
  const handleEditDayPlan = () => {
    console.log("click day plan");
  };

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.title}>
          {title}
          <EditIcon className={classes.icon} onClick={handleEditDayPlan} />
        </div>
        <CardContent>
          <Grid container>
            {meals && meals.length && meals.map((meal) => (
              <>
                <Grid item xs="12" sm="2">
                  {meal.title}
                </Grid>
                <Grid item xs="12" sm="10">
                  <ul className={classes.list}>
                    {meal.dishes.map((dish) => (
                      <li className={classes.item}>{dish.name}</li>
                    ))}
                  </ul>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomCard;
