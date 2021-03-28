/* eslint-disable no-extra-parens */
import { signOut, useSession } from 'next-auth/client';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Link from '../lib/Link.jsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

const Header = () => {
    const [session] = useSession();
    const [anchorEl, setAnchorEl] = useState(null);

    const hideShowMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAboutClick = (ev) => {
        ev.preventDefault();
        Router.push('/about');
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Box mr={1}>
                        <img
                            alt="logo"
                            color="primary"
                            height="40"
                            src="/logo_60.png"
                        />
                    </Box>
                    <Link
                        color="inherit"
                        display="inline"
                        href="/"
                        underline="none"
                    >
                        <Typography variant="h4">
                            TV Tracker
                        </Typography>
                    </Link>
                    <Box flexGrow="1" />
                    <Button
                        color="inherit"
                        onClick={handleAboutClick}
                    >
                        About
                    </Button>
                    { session &&
                        <Tooltip
                            arrow
                            title={session.user.name}
                        >
                            <IconButton
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={hideShowMenu}
                            >
                                <AccountCircleIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>}
                    <Menu
                        anchorEl={anchorEl}
                        id="profile-menu"
                        keepMounted
                        onClose={handleClose}
                        open={Boolean(anchorEl)}
                    >
                        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
