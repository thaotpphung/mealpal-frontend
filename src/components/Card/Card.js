import React from "react";
import useStyles from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";

const CustomCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.title}>Monday</div>
      <CardContent>
        <Grid container>
          <Grid item xs="12" sm="2">Breakfast</Grid>
          <Grid item xs="12" sm="10">
            <ul className={classes.list}>
              <li className={classes.item}>
                THoa
              </li>
              <li className={classes.item}>
                THoa
              </li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
