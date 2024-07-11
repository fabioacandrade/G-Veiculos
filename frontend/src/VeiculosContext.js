import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const VeiculosContext = createContext();

export const useVeiculos = () => {
    return useContext(VeiculosContext);
};

export const VeiculosProvider = ({ children }) => {
    const [veiculos, setVeiculos] = useState([]);
    const [veiculosLista, setVeiculosLista] = useState([]);

    const fetchVeiculos = useCallback(async () => {
        const adminNome = localStorage.getItem('nomeUsuario');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/veiculo/listaEstacionados/${adminNome}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            setVeiculos(response.data);
        } catch (error) {
            setVeiculos([]);
            console.error('Erro ao buscar veículos:', error);
        }
    }, []);

    const fetchListaVeiculos = useCallback(async () => {
        try {
            const adminNome = localStorage.getItem('nomeUsuario');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/veiculo/${adminNome}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setVeiculosLista(response.data);
        } catch (error) {
            setVeiculosLista([]);
            console.error('Erro ao buscar veículos:', error);
        }
    }, []);

    useEffect(() => {
        fetchListaVeiculos();
    }, [fetchListaVeiculos]);

    useEffect(() => {
        fetchVeiculos();
    }, [fetchVeiculos]);

    return (
        <VeiculosContext.Provider value={{ veiculos, veiculosLista, fetchVeiculos, fetchListaVeiculos }}>
            {children}
        </VeiculosContext.Provider>
    );
};
