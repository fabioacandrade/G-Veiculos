import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Usuario() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                    }
                    );
                    setUserData(response.data);
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            } else {
                console.error('nomeUsuario não encontrado no localStorage');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        
        }}>
            <h1>Perfil do usuário</h1>
            {userData ? (
                <div>
                    <h3>Nome: {userData.nome}</h3>
                    <h3>Email: {userData.email}</h3>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
