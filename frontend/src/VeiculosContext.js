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
        console.log('fetchVeiculos called');
        try {
            const token = localStorage.getItem('token');
            console.log('token:', token)
            const response = await axios.get('http://localhost:8080/api/veiculo/listaEstacionados', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setVeiculos(response.data);
        } catch (error) {
            setVeiculos([]);
            console.error('Erro ao buscar veículos:', error);
        }
    }, []);

    const fetchListaVeiculos = useCallback(async () => {
        console.log('fetchListaVeiculos called');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/veiculo', {
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
        console.log('useEffect in VeiculosProvider called');
        fetchVeiculos();
    }, [fetchVeiculos]);

    return (
        <VeiculosContext.Provider value={{ veiculos, veiculosLista, fetchVeiculos, fetchListaVeiculos }}>
            {children}
        </VeiculosContext.Provider>
    );
};
