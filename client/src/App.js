import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { green } from 'material-ui/colors'
import Experiences from "./pages/Experience";
import Leftbar from './pages/Experience/Leftbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      500: '#37a000'
    }, 
    white: {
      500: '#ffffff'
    }
  }
})

const App = () =>
  <Router>
    <MuiThemeProvider theme={theme} >
      <Switch>
        <Route exact path="/" component={Experiences} />
        <Route exact path='/leftbar' component={Leftbar} />
        <Route exact path="/search" component={Experiences} />
      </Switch>
    </MuiThemeProvider>
  </Router>;

export default App;
