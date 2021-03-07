/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ShowSearchForm = (props) => {
    const { handleFormSubmit, searchTerm, setSearchTerm } = props;

    return (
        <Grid
            item
            lg={4}
            md={8}
            xs={12}
        >
            <Box mt={-1}>
                <Paper elevation={6}>
                    <Box mx={2}>
                        <form
                            autoComplete="off"
                            noValidate
                            onSubmit={handleFormSubmit}
                        >
                            <Box pt={1}>
                                <Typography
                                    component="h2"
                                    variant="h6"
                                >
                                    Find a show
                                </Typography>
                            </Box>
                            <Box my={2}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Search Term"
                                    name="search"
                                    onChange={(ev) => setSearchTerm(ev.target.value)}
                                    type="search"
                                    value={searchTerm}
                                    variant="filled"
                                />
                            </Box>
                            <Button
                                color="secondary"
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </form>
                        <br />
                    </Box>
                </Paper>
            </Box>
        </Grid>
    );
};

ShowSearchForm.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired
};

export default ShowSearchForm;
