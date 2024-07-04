import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import "./style/navBar.css";

function PrimaryAppBar({ toggleDrawer }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>GCars</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function AnchorTemporaryDrawer({ state, toggleDrawer }) {
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Link to='/cadastro-veiculo' style={{ textDecoration: 'none' }}>
                <Button sx={{
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '1.1rem',
                    color: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#e3f2fd'
                    }
                }}>Cadastrar Veículos</Button>
            </Link>
            <Divider />
            <Link to='/cadastro-proprietario' style={{ textDecoration: 'none' }}>
                <Button sx={{
                    width: '100%',
                    padding: '16px 0',
                    fontSize: '1.1rem',
                    color: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#e3f2fd'
                    }
                }}>Cadastrar Proprietário</Button>
            </Link>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}

export default function App() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <PrimaryAppBar toggleDrawer={toggleDrawer} />
            <AnchorTemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
        </div>
    );
}
