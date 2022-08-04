
import createTheme from '@mui/material/styles/createTheme';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#ff8a80'
    }
  }
  // components: {
  //   MuiTypography: {
  //     defaultProps: {
  //       variantMapping: {
  //         h1: 'h1',
  //         h2: 'h2',
  //         h3: 'h3',
  //         h4: 'h4',
  //         h5: 'h5',
  //         p: 'p'
  //       }
  //     }
  //   }
  // }
});

export default theme