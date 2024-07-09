import React, { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(null);

    const validateToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await Axios.post(
                    "http://localhost:8080/api/auth/validateToken",
                    { token: token }, // Sending token in the request body
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Sending token in the headers
                        }
                    }
                );
                if (response.status === 200) {
                    console.log("Token válido");
                    setIsTokenValid(true);
                } else {
                    console.log("Token inválido");
                    setIsTokenValid(false);
                    navigate('/login');
                }
            } else {
                setIsTokenValid(false);
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            setIsTokenValid(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        validateToken();
    });

    if (isTokenValid === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='body'>
            <NavBar className='navbar'></NavBar>
            <Outlet className="outlet" />
        </div>
    );
}
