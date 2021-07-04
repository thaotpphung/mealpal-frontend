import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStyles from "./styles";
import './App.css';

import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/Navbar/Navbar";
import Plans from "./components/Plans/Plans";
import NewPlan from "./components/Plans/NewPlan/NewPlan";
import Auth from "./components/Auth/Auth";


function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Container className={classes.root}>
          <Switch>
            <Route path="/plans" exact component={Plans} />
            <Route path="/plans/new" exact component={NewPlan} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
