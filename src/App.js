import React from 'react';
import Flyers from './containers/Flyers'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: pink,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Flyers />
    </ThemeProvider>
  )
}

export default App;
