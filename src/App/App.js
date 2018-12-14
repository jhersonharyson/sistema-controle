import React, { Component } from 'react'
import Router from './Router/Router'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c62828',
    },
    secondary: indigo,
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(theme)(App)