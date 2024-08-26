import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';
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
        <AppBar className='static'>
            <Container maxWidth="xl">
                <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    className="flex-grow font-bold tracking-widest md:flex sm:hidden"
                    color='white'
                >
                    <Link href="/about" className='no-underline text-inherit'>Up2Date</Link> 
                </Typography>

                <Box className='flex-grow sm:flex md:hidden'>
                    <IconButton
                    size="large"
                    aria-label="nav menu"
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
                    className='sm:block md:hidden'
                    >
                    {Object.keys(pagesToLinks).map((page) => (
                        <MenuItem 
                            key={page} 
                            onClick={handleCloseNavMenu}
                        >
                        <Typography className='text-center'>
                            <RouterLink className='no-underline text-inherit' to={`/${pagesToLinks[page]}`}>{page}</RouterLink>
                        </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    className="mr-2 flex flex-grow font-bold tracking-widest md:hidden sm:flex"
                >
                    <Link to="/about" className='no-underline text-inherit'>Up2Date</Link>
                </Typography>
                <Box className='flex-grow sm:hidden md:flex'>
                    {Object.keys(pagesToLinks).map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                    >
                        <RouterLink className='no-underline text-inherit' to={`/${pagesToLinks[page]}`}>{page}</RouterLink>
                    </Button>
                    ))}
                </Box>

                <Box className='flex-grow-0'>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} className='p-0'>
                            <Avatar alt="Settings menu icon" >
                                <Person />
                            </Avatar>   
                        </IconButton>
                    </Tooltip>
                    <Menu
                    className='mt-11'
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
                            <Typography className='text-center'>
                                <RouterLink className='no-underline ' to={settingsToLinks[setting]} >{setting}</RouterLink>
                            </Typography>
                        </MenuItem>
                    ))}
                        <MenuItem key='AuthAction' onClick={handleAuthActionClick}>
                            <Typography className='text-center'>
                                {getAuthActionFromSessionStatus()}
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
  );

}