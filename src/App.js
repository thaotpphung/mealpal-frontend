import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStyles from "./styles";

import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/Navbar/Navbar";
import PlanPage from "./pages/PlanPage/PlanPage";

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Container className={classes.root}>
          <Switch>
            <Route path="/plans" exact component={PlanPage} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
