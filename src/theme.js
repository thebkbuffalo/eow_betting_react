import { red } from '@mui/material/colors';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

export default theme