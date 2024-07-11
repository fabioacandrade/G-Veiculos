import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Avatar, Button, Typography, Container, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

export default function Usuario() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    useEffect(() => {
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

        fetchUserData();
    }, []);

    function stringAvatar(name) {
        if (!name) return {};
        const nameArray = name.split(' ');
        if (nameArray.length < 2) return { children: name[0] };
        return {
            sx: {
                bgcolor: stringToColor(name),
                color: '#fff',
                width: 100,
                height: 100,
                fontSize: 40,
            },
            children: `${nameArray[0][0]}${nameArray[1][0]}`,
        };
    }

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                userData && (
                    <div>
                        <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                            <Avatar {...stringAvatar(userData.nome)} />
                            <Typography variant="h4">Perfil do Usuário</Typography>
                        </Stack>
                        <Typography variant="h4">Nome: {userData.nome}</Typography>
                        <Typography variant="h4">Email: {userData.email}</Typography>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            onClick={handleLogout} 
                            sx={{ mt: 4 }}
                        >
                            Logout
                        </Button>
                    </div>
                )
            )}
        </Container>
    );
}
