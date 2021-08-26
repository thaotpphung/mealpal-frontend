import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStyles from "./styles";
import './App.css';
import { CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Navbar from "../views/common/Navbar/Navbar";
import PlanPage from "../views/pages/PlanPage/PlanPage";
import NewPlanPage from "../views/pages/NewPlanPage/NewPlanPage";
import EditDayPage from "../views/pages/EditDayPage/EditDayPage";
import HomePage from "../views/pages/HomePage/HomePage";
import AuthPage from "../views/pages/AuthPage/AuthPage";

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <div className={classes.root}>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/plans/" exact component={PlanPage}/>
            <Route path="/plans/new" exact component={NewPlanPage}/>
            <Route path="/days/edit" exact component={EditDayPage}/>
            <Route path="/auth" exact component={AuthPage}/> 
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
