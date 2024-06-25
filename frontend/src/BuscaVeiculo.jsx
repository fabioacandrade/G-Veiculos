import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BuscaVeiculo(){

    const [veiculo, setVeiculo] = useState([]);
    const [placa, setPlaca] = useState('');

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/veiculo/${placa}`);
                setVeiculo(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };

        fetchVeiculos();
    }, [placa]);


    return(
        <div>
            <h1>Busca de Veículo</h1>
            <input type="text" placeholder="Placa do veículo" onChange={(e) => setPlaca(e.target.value)} />
            <button onClick={() => setPlaca(placa)}>Buscar</button>
            <div>
                <h2>Veículo</h2>
                <ul>
                    {veiculo.map((veiculo) => (
                        <li key={veiculo.id}>
                            <p>Placa: {veiculo.placa}</p>
                            <p>Marca: {veiculo.marca}</p>
                            <p>Modelo: {veiculo.modelo}</p>
                            <p>Ano: {veiculo.ano}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}