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
            const nomeAdmin = localStorage.getItem('nomeUsuario');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/proprietario/cpf/${cpf}/${nomeAdmin}`, {
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

    const excluirProprietario = async (cpf) => {
        try {
            const nomeAdmin = localStorage.getItem('nomeUsuario');
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/proprietario/${cpf}/${nomeAdmin}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchVeiculos();
            fetchProprietarioList();
            setMostrarProprietário(false);
        } catch (error) {
            console.error('Erro ao excluir proprietário:', error);
            setErrors('Erro ao excluir proprietário');
        }
    };

    const fetchProprietarioList = async () => {
        try {
            const nomeAdmin = localStorage.getItem('nomeUsuario');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/proprietario/list/${nomeAdmin}`, {
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

    function handleCadastrarVeiculo(cpf) {
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
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 11 }}
                onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
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
                        <h3>Endereço</h3>
                        <p>Cidade: {proprietario.cidade}</p>
                        <p>Estado: {proprietario.estado}</p>
                        <p>CEP: {proprietario.cep}</p>
                        <p>Rua: {proprietario.endereco}</p>
                        <p>Numero: {proprietario.numero}</p>
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
                            }} variant='outlined' onClick={() => handleCadastrarVeiculo(proprietario.cpf)}>Cadastrar Veículo</Button>
                        </div>
                        <div className='buttons'>
                            <Button variant='contained' onClick={() => voltarLista()}>Voltar</Button>
                            <Button color='error' variant='contained' onClick={() => excluirProprietario(proprietario.cpf)}>Excluir Proprietário</Button>
                        </div>
                    </div>
                    :
                    <div className='list-container'>
                        <ul>
                            {proprietarioLista.length === 0 ? (
                                <p style={{
                                    textAlign: 'center',
                                }}>Nenhum proprietário cadastrado</p>
                            ) :
                                (proprietarioLista.map((p) => (
                                    <li style={{
                                        listStyle: 'none'
                                    }} key={p.id}>
                                        <p>Nome: {p.nome}</p>
                                        <p>Email: {p.email}</p>
                                        <p>Telefone: {formatTelephoneNumber(p.telefone)}</p>
                                        <div style={{
                                            margin: '20px'
                                        }} className="button-container">
                                            <Button variant="outlined" onClick={() => fetchProprietarioByCpf(String(p.cpf))}>Ver Detalhes</Button>
                                        </div>
                                        <Divider></Divider>
                                    </li>
                                )))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
