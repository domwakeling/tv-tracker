/* eslint-disable no-extra-parens */
import * as constants from '../src/constants.js';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// import Link from '../src/Link.jsx';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// eslint-disable-next-line no-magic-numbers


const SignInUp = (props) => {
    const { mode } = props;
    const [userData, setUserData] = useState({
        confirm: '',
        email: '',
        name: '',
        password: ''
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(userData);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3}>
                <Box mx={2}>
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Box pt={1}>
                            <Typography
                                component="h2"
                                variant="h6"
                            >
                                { mode === constants.MODE_SIGN_UP
                                    ? 'Create an account'
                                    : 'Sign in'}
                            </Typography>
                        </Box>
                        <Box my={2}>
                            <TextField
                                color="secondary"
                                fullWidth
                                label="Name"
                                name="userName"
                                onChange={(ev) => setUserData({ ...userData,
                                    name: ev.target.value })}
                                value={userData.name}
                                variant="outlined"
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                color="secondary"
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(ev) => setUserData({
                                    ...userData,
                                    email: ev.target.value
                                })}
                                type="email"
                                value={userData.email}
                                variant="outlined"
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                color="secondary"
                                fullWidth
                                label="Password"
                                name="password"
                                onChange={(ev) => setUserData({
                                    ...userData,
                                    password: ev.target.value
                                })}
                                type="password"
                                value={userData.password}
                                variant="outlined"
                            />
                        </Box>
                        { mode === constants.MODE_SIGN_UP
                            ? (
                                <Box my={2}>
                                    <TextField
                                        color="secondary"
                                        error={userData.password !== userData.confirm}
                                        fullWidth
                                        helperText={userData.password === userData.confirm
                                            ? ' '
                                            : 'Password does not match'}
                                        label="Confirm Password"
                                        name="confirm"
                                        onChange={(ev) => setUserData({
                                            ...userData,
                                            confirm: ev.target.value
                                        })}
                                        type="password"
                                        value={userData.confirm}
                                        variant="outlined"
                                    />
                                </Box>
                            )
                            : ''}
                        <Button
                            color="secondary"
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                        <Button
                            color="primary"
                            // onClick={clear}
                            size="small"
                            variant="contained"
                        >
                            Clear
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

SignInUp.propTypes = {
    mode: PropTypes.number.isRequired
};

export default SignInUp;
