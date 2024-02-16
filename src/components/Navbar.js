import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, IconButton, Toolbar, Avatar, Typography, Box, Tooltip, Collapse} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import profilePic from './Arba.jpg';

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [minimized, setMinimized] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        navigate(path);
    };

    const toggleMinimize = () => {
        setMinimized(!minimized);
    };

    const handleDropdownClick = () => {
        setOpen(!open);
    };

    const handleProfileClick = () => {
        navigate('/customersfeedback');
        setOpen(false);
    };

    const handleLogoutClick = () => {
        // Remove the JWT from localStorage
        localStorage.removeItem('token'); 
        // Navigate the user to the login page (or wherever you'd like them to go after logging out)
        navigate('/login');
        setOpen(false);
        onLogout(); // Call the onLogout prop
    };

    return (
        <div style={{ overflowY: 'auto' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMinimize}>
                        <MenuIcon />
                    </IconButton>
                    CRM
                </Toolbar>
            </AppBar>
            <Box sx={{ width: minimized ?  110 : 240, transition: '0.3s' }}>
                {!minimized && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' ,marginBottom: '1rem' }}>
                        <Avatar alt="Profile Picture" src={profilePic} />
                        <Typography variant="h6">Aravind</Typography>
                    </div>
                )}
                <List component="nav">
                    <Tooltip title="Dashboard" placement="right-end">
                        <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0, '/dashboard')}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Dashboard" />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Customer List" placement="right-end">
                        <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1, '/customers')}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <ListAltIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Customer List" primaryTypographyProps={{ variant: 'body2' }} />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Calculate Expense" placement="right-end">
                        <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2, '/ExpenseCalculation')}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <CalculateIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Calculate Expense" primaryTypographyProps={{ variant: 'body2' }} />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Product" placement="right-end">
                        <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3, '/product')}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Product List" primaryTypographyProps={{ variant: 'body2' }} />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Feedback" placement="right-end">
                        <ListItem button selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4, '/customersfeedback')}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <FeedbackIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Feedback" primaryTypographyProps={{ variant: 'body2' }} />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Settings" placement="right-end">
                        <ListItem button onClick={handleDropdownClick}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                                <SettingsIcon />
                            </ListItemIcon>
                            {!minimized && <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />}
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </Tooltip>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button style={{ paddingLeft: 30 }} onClick={handleProfileClick}>
                                <ListItemText primary="Profile" primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                            <ListItem button style={{ paddingLeft: 30 }} onClick={handleLogoutClick}>
                                <ListItemText primary="Logout" primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Box>
        </div>
    );
};

export default Navbar;
