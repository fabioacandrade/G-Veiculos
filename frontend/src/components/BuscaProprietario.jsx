import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import './style/buscaVeiculo.css';
import { useVeiculos } from '../VeiculosContext';

export default function BuscaVeiculo() {

    const { fetchVeiculos } = useVeiculos();

    const [proprietario, setProprietario] = useState({});
    const [proprietarioLista, setProprietarioLista] = useState([]);
    const [cpf, setCpf] = useState('');
    const [mostrarProprietário, setMostrarProprietário] = useState(false);
    const [errors, setErrors] = useState('');


    const fetchProprietarioByCpf = async (cpf) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/proprietario/cpf/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setProprietario(response.data);
            setMostrarProprietário(true);
        } catch (error) {
            console.error('Erro ao buscar proprietário:', error);
            setErrors('Proprietário não encontrado');
        }
    };

    const fetchProprietarioList = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/proprietario/list`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setProprietarioLista(response.data);
        } catch (error) {
            console.error('Erro ao buscar proprietário:', error);
            setErrors('Proprietários não encontrados');
        }
    }

    const estacionarVeiculoVoltandoParaALista = async (veiculoToEstacionar) => {
        const veiculoToEstacionarId = veiculoToEstacionar.id;
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/veiculo/estacionar/${veiculoToEstacionarId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMostrarProprietário(false);
            fetchVeiculos();
        } catch (error) {
            console.error('Erro ao estacionar veículo:', error);
            setErrors('Erro ao estacionar veículo');
        }
    };


    useEffect(() => {
        fetchProprietarioList();
    }, []);

    function HandleCadastrarVeiculo(cpf) {
        window.location.href = `/cadastro-veiculo/${cpf}`;
    }


    function voltarLista() {
        setMostrarProprietário(false);
    }

    const formatTelephoneNumber = (telefone) => {
        if (telefone.length === 11) {
            return telefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else {
            return telefone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }

    return (
        <div>
            <h2>Proprietários Cadastrados</h2>
            <TextField
                type="text"
                fullWidth
                placeholder="CPF do proprietário"
                onChange={(e) => setCpf(e.target.value)}
                className="text-field"
            />
            <Button sx={{
                marginTop: '10px',
                width: '100%',
            }} className="search-button" variant='contained' onClick={() => fetchProprietarioByCpf(cpf)}>Buscar</Button>
            <div>
                {errors ?
                    <p className='error'>{errors}</p>
                    :
                    <p></p>
                }
                {mostrarProprietário ?
                    <div className='list-container'>
                        <p>Nome: {proprietario.nome}</p>
                        <p>CPF: {proprietario.cpf}</p>
                        <p>Email: {proprietario.email}</p>
                        <p>Telefone: {formatTelephoneNumber(proprietario.telefone)}</p>
                        <div className='veiculos'>
                            <h2>Veículos:</h2>
                            <ul>
                                {proprietario.veiculos.map((v) => (
                                    <li key={v.id}>
                                        <p>Placa: {v.placa}</p>
                                        <p>Cor: {v.cor}</p>
                                        <p>Ano: {v.ano}</p>
                                        {
                                            !v.estacionado ?
                                            <Button variant='contained' onClick={() => estacionarVeiculoVoltandoParaALista(v)}>estacionar</Button>
                                            :
                                            <p className='help'>Veículo estacionado</p>
                                        }
                                        <Divider></Divider>
                                    </li>
                                ))}
                            </ul>
                            <Button sx={{
                                marginBottom: '10px',
                            }} variant='outlined' onClick={() => HandleCadastrarVeiculo(proprietario.cpf)}>Cadastrar Veículo</Button>
                        </div>
                        <Button variant='contained' onClick={() => voltarLista()}>Voltar</Button>
                    </div>
                    :
                    <div className='list-container'>
                        <ul>
                            {proprietarioLista.map((p) => (
                                <li key={p.id}>
                                    <p>Nome: {p.nome}</p>
                                    <p>Email: {p.email}</p>
                                    <p>Telefone: {formatTelephoneNumber(p.telefone)}</p>
                                    <div className="button-container">
                                        <Button variant="outlined" onClick={() => fetchProprietarioByCpf(String(p.cpf))}>Ver Detalhes</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
