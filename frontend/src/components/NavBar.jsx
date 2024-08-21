import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Avatar,
    Tooltip,
    Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountBoxOutlined } from '@mui/icons-material/';
import { logUserOut } from '../state/slices/sessionSlice';

export default function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = useSelector((state) => state.session.session);
    const sessionLoading = useSelector((state) => state.session.loading);
    const sessionError = useSelector((state) => state.session.error);

    const pagesToLinks = {
        Home: '',
        Search: 'search',
        Stocks: 'stocks',
    }

    const getAuthActionFromSessionStatus = () => {
        if (sessionLoading) {
            return 'Logging you out...';
        } 
        if (sessionError) {
            return 'Error logging you out. Please try again.';
        }
        return session ? 'Logout' : 'Login';
    }

    const handleAuthActionClick = () => {
        if (session) {
            dispatch(logUserOut());
        } else {
            navigate('/login');
        }
    }
    
    const settingsToLinks = {
        Settings: 'settings',
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <Link reloadDocument to="/about">Up2Date</Link> 
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {Object.keys(pagesToLinks).map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                            <Link to={`/${pagesToLinks[page]}`}>{page}</Link>
                        </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <Link reloadDocument to="/about">Up2Date</Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {Object.keys(pagesToLinks).map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        <Link to={`/${pagesToLinks[page]}`}>{page}</Link>
                    </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Settings menu icon" >
                                <AccountBoxOutlined />
                            </Avatar>   
                        </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {Object.keys(settingsToLinks).map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                            <Link to={settingsToLinks[setting]} >{setting}</Link>
                        </Typography>
                        </MenuItem>
                    ))}
                    <MenuItem key='AuthAction' onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                            <Button onClick={handleAuthActionClick} disabled={sessionLoading} >
                                {getAuthActionFromSessionStatus()}
                            </Button>
                        </Typography>
                    </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
  );

}