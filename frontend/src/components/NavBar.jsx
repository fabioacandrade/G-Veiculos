import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import "./style/navBar.css";
import logo from '../images/logo-no-background.png'; // Importe a imagem diretamente

function PrimaryAppBar({ toggleDrawer, toggleProfileDrawer }) {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = (event) => {
        toggleProfileDrawer('right', true)(event);
        handleMenuClose();
    };

    const handleLogOutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nomeUsuario');
        navigate('/login');
        handleMenuClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={(event) => toggleDrawer('left', true)(event)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className='elementsNavBar'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link to={'/home'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={logo} alt="GCARS Logo" style={{ height: '40px' }} />
                            </Link>
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="account"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                        >
                            <AccountCircleIcon style={{ fontSize: '2.5rem' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                            <MenuItem onClick={handleLogOutClick}>Log out</MenuItem>
                        </Menu>
                    </div>
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
            onClick={(event) => toggleDrawer(anchor, false)(event)}
            onKeyDown={(event) => toggleDrawer(anchor, false)(event)}
        >
            <img
                src={logo}
                alt="GCARS Logo"
                style={{
                    height: '80px', // Aumenta o tamanho da imagem
                    display: 'block',
                    margin: '20px auto' // Centraliza a imagem horizontalmente
                }}
            />
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
            <Divider />
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
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={(event) => toggleDrawer('left', false)(event)}
            >
                {list('left')}
            </Drawer>
        </div>
    )
}

function ProfileDrawer({ state, toggleDrawer }) {

    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        if (state.right) {
            fetchUserData();
        }
    }, [state.right]);

    const fetchUserData = async () => {
        const nomeUsuario = localStorage.getItem('nomeUsuario');
        const token = localStorage.getItem('token');
        if (nomeUsuario) {
            try {
                const response = await axios.get(`http://localhost:8080/api/admin/getByNome/${nomeUsuario}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Erro ao buscar dados do usuário.');
            } finally {
                setLoading(false);
            }
        } else {
            console.error('nomeUsuario não encontrado no localStorage');
            setError('nomeUsuario não encontrado no localStorage.');
            setLoading(false);
        }
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 350 }} // Ajuste a largura do Drawer aqui
            role="presentation"
            onClick={(event) => toggleDrawer(anchor, false)(event)}
            onKeyDown={(event) => toggleDrawer(anchor, false)(event)}
        >
            <img
                src={logo}
                alt="GCARS Logo"
                style={{
                    height: '80px', // Aumenta o tamanho da imagem
                    display: 'block',
                    margin: '20px auto' // Centraliza a imagem horizontalmente
                }}
            />
            <Typography variant="h5" sx={{ p: 2 }}>
                Perfil do Usuário
            </Typography>
            <Divider />
            {loading ? (
                <Typography variant="body1" sx={{ p: 2 }}>
                    Carregando...
                </Typography>
            ) : error ? (
                <Typography variant="body1" sx={{ p: 2, color: 'red' }}>
                    {error}
                </Typography>
            ) : (
                <>
                    <Typography variant="body1" sx={{ p: 2 }}>
                        <strong>Nome:</strong> {userData?.nome}
                    </Typography>
                    <Typography variant="body1" sx={{ p: 2 }}>
                        <strong>E-Mail:</strong> {userData?.email}
                    </Typography>
                </>
            )}
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor="right"
                open={state.right}
                onClose={(event) => toggleDrawer('right', false)(event)}
            >
                {list('right')}
            </Drawer>
        </div>
    );
}

export default function App() {
    const [state, setState] = React.useState({
        left: false,
    });

    const [profileState, setProfileState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const toggleProfileDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setProfileState({ ...profileState, [anchor]: open });
    };

    return (
        <div>
            <PrimaryAppBar toggleDrawer={toggleDrawer} toggleProfileDrawer={toggleProfileDrawer} />
            <AnchorTemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
            <ProfileDrawer state={profileState} toggleDrawer={toggleProfileDrawer} />
        </div>
    );
}
