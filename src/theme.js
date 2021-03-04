/* eslint-disable sort-keys */
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#f29626',
                color: 'white'
            }
        },
        // Style sheet name ⚛️
        MuiFilledInput: {
            // Name of the rule
            root: {
                // Some CSS
                backgroundColor: '#f0f6fe',
                '&:hover': {
                    backgroundColor: '#ddebfd'
                },
                '&.Mui-focused': {
                    backgroundColor: '#f0f6fe'
                }
            }
        }
    },
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
            main: '#2682f2'
        }
    }
});

export default theme;
