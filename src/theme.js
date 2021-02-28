import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#fff'
        },
        error: {
            main: red.A400
        },
        primary: {
            main: '#f29626'
        },
        secondary: {
            main: '#19857b'
        }
    }
});

export default theme;
