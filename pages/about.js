/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '../src/Link.jsx';
import React from 'react';
import Typography from '@material-ui/core/Typography';


const About = () => (
    <Container maxWidth="sm">
        <Box my={4}>
            <Typography
                component="h1"
                gutterBottom
                variant="h4"
            >
                Next.js example
            </Typography>
            <Button
                color="primary"
                component={Link}
                href="/"
                naked
                variant="contained"
            >
                Go to the main page
            </Button>
        </Box>
    </Container>
);

export default About;
