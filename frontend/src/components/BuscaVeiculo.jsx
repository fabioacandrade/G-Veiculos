import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './style/buscaVeiculo.css';
import { useVeiculos } from '../VeiculosContext';

export default function BuscaVeiculo() {
    const { veiculosLista, fetchListaVeiculos, fetchVeiculos } = useVeiculos();
    const [veiculo, setVeiculo] = useState({});
    const [proprietario, setProprietario] = useState({});
    const [placa, setPlaca] = useState('');
    const [mostrarVeiculo, setMostrarVeiculo] = useState(false);
    const [errors, setErrors] = useState('');

    const fetchVeiculosPlaca = async (placaToFetch) => {
        try {
            const placa = placaToFetch.toUpperCase();
            const token = localStorage.getItem('token');
            const nomeUsuario = localStorage.getItem('nomeUsuario');
            const response = await axios.get(`http://localhost:8080/api/veiculo/placa/${placa}/${nomeUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setVeiculo(response.data);
            setMostrarVeiculo(true);
            setErrors('');
            fetchVeiculos();
            fetchProprietario(placaToFetch);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
            setErrors('Veículo não encontrado');
        }
    };

    useEffect(() => {
        fetchListaVeiculos();
    }, [fetchListaVeiculos]);

    const fetchProprietario = async (placaToFetch) => {
        try {
            const token = localStorage.getItem('token');
            const nomeUsuario = localStorage.getItem('nomeUsuario');
            const response = await axios.get(`http://localhost:8080/api/veiculo/proprietario/${placaToFetch}/${nomeUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setProprietario(response.data);
        } catch (error) {
            console.error('Erro ao buscar proprietário:', error);
        }
    };

    const estacionarVeiculoVoltandoParaALista = async (veiculoToEstacionar) => {
        const veiculoToEstacionarId = veiculoToEstacionar.id;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/veiculo/estacionar/${veiculoToEstacionarId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchListaVeiculos();
            fetchVeiculos();
        } catch (error) {
            console.error('Erro ao estacionar veículo:', error);
            setErrors('Erro ao estacionar veículo');
        }
    };

    const excluirVeículo = async (placa) => {
        try {
            const token = localStorage.getItem('token');
            const nomeUsuario = localStorage.getItem('nomeUsuario');
            await axios.delete(`http://localhost:8080/api/veiculo/excluir/${placa}/${nomeUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchListaVeiculos();
            fetchVeiculos();
            setMostrarVeiculo(false);
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
            setErrors('Erro ao excluir veículo');
        }
    }

    function formatarDataIso8601(dataIso) {
        const data = new Date(dataIso);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

    function voltarLista() {
        fetchListaVeiculos();
        setMostrarVeiculo(false);
    }

    return (
        <div>
            <h2>Veículos Cadastrados</h2>
            <TextField
                type="text"
                fullWidth
                placeholder="Placa do veículo"
                onChange={(e) => setPlaca(e.target.value)}
                className="text-field"
                inputProps={{ maxLength: 7 }}
            />
            <Button sx={{
                marginTop: '10px',
                width: '100%',
            }} className="search-button" variant='contained' onClick={() => fetchVeiculosPlaca(placa)}>Buscar</Button>
            <div>
                {errors ?
                    <p className='error'>{errors}</p>
                    :
                    <p></p>
                }
                {mostrarVeiculo ?
                    <div className='list-container'>
                        <h3>Veículo</h3>
                        <p>Placa: {veiculo.placa}</p>
                        <p>Cor: {veiculo.cor}</p>
                        <p>Ano: {veiculo.ano}</p>
                        <p>Hora de Entrada: {formatarDataIso8601(veiculo.horaEntrada)}</p>
                        <div className='proprietario'>
                            <h3>Proprietário</h3>
                            <p>Nome: {proprietario.nome}</p>
                            <p>E-mail: {proprietario.email}</p>
                            <p>Telefone: {proprietario.telefone}</p>
                            <h3>Endereço:</h3>
                            <p>Cidade: {proprietario.cidade}</p>
                            <p>Estado: {proprietario.estado}</p>
                            <p>CEP: {proprietario.cep}</p>
                            <p>Rua: {proprietario.endereco}</p>
                            <p>Numero: {proprietario.numero}</p>
                        </div>
                        <div className='buttons'>
                            <Button variant='outlined' onClick={() => voltarLista()}>Voltar</Button>
                            <Button color='error' variant='contained' onClick={() => excluirVeículo(veiculo.placa)}>Excluir Veículo</Button>
                        </div>
                    </div>
                    :
                    <div className='list-container'>
                    {veiculosLista.length === 0 ? (
                        <p style={{
                            textAlign: 'center',
                        }}>Nenhum veículo cadastrado</p>
                    ) : (
                        <ul>
                            {veiculosLista.map((v) => (
                                <li
                                    style={{
                                        listStyle: 'none',
                                    }}
                                    key={v.id}
                                >
                                    <p>Placa: {v.placa}</p>
                                    {/* <p>Cor: {v.cor}</p>
                                    <p>Ano: {v.ano}</p> */}
                                    <div
                                        style={{
                                            margin: '10px',
                                        }}
                                        className="button-container"
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => fetchVeiculosPlaca(String(v.placa))}
                                        >
                                            Ver Detalhes
                                        </Button>
                                        {!v.estacionado ? (
                                            <Button
                                                variant="contained"
                                                className='button'
                                                onClick={() => estacionarVeiculoVoltandoParaALista(v)}
                                            >
                                                Estacionar
                                            </Button>
                                        ) : (
                                            <p className='help'>Veículo estacionado</p>
                                        )}
                                    </div>
                                    <Divider />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                }
            </div>
        </div>
    );
}
