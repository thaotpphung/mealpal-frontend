import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStyles from "./styles";
import './App.css';
import { useSelector } from 'react-redux';
import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

import Navbar from "../views/common/Navbar/Navbar";
import PlanPage from "../views/pages/PlanPage/PlanPage";
import HomePage from "../views/pages/HomePage/HomePage";
import AuthPage from "../views/pages/AuthPage/AuthPage";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { currentUser } = userSignin;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Container className={classes.root}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/plans" exact component={PlanPage} />
            <Route path="/auth" exact component={AuthPage}/> 
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
