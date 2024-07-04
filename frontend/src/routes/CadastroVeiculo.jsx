import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios';
import { cpf } from 'cpf-cnpj-validator';
import { useNavigate } from 'react-router-dom';

import './style/cadastroVeiculo.css';

export default function ValidationTextFields() {
    const navigate = useNavigate();

    const [veiculo, setVeiculo] = useState({
        placa: '',
        cor: '',
        estacionado: true,
        tipo: 'carro',
        ano: '',
        modelo: '',
        marca: '',
        proprietarioCPF: '',
    });

    const [errors, setErrors] = useState({
        placa: '',
        cor: '',
    });

    const respostasEstacionado = [
        {
            value: false,
            label: 'Não',
        },
        {
            value: true,
            label: 'Sim',
        },
    ];

    const respostasTipo = [
        {
            value: 'carro',
            label: 'Carro',
        },
        {
            value: 'moto',
            label: 'Moto',
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVeiculo((prevVeiculo) => ({
            ...prevVeiculo,
            [name]: name === 'estacionado' ? value === 'true' : value,
        }));
    };

    const validate = () => {
        let valid = true;
        let newErrors = { placa: '', cor: '' };

        if (veiculo.placa.length !== 7) {
            newErrors.placa = 'A placa do veículo deve ter 7 caracteres';
            valid = false;
        }

        if (!veiculo.cor.trim()) {
            newErrors.cor = 'A cor do veículo é obrigatória';
            valid = false;
        }

        if (!veiculo.ano.trim()) {
            newErrors.ano = 'O ano do veículo é obrigatório';
            valid = false;
        }

        if (isNaN(veiculo.ano)) {
            newErrors.ano = 'O ano do veículo deve ser um número';
            valid = false;
        }

        if (veiculo.ano.length !== 4) {
            newErrors.ano = 'O ano do veículo deve ter 4 dígitos';
            valid = false;
        }
        const currentYear = new Date().getFullYear();
        if (veiculo.ano < 1950 || veiculo.ano > currentYear) {
            newErrors.ano = 'O ano do veículo deve ser entre 1950 e ' + currentYear;
            valid = false;
        }

        if (!veiculo.modelo.trim()) {
            newErrors.modelo = 'O modelo do veículo é obrigatório';
            valid = false;
        }

        if (!veiculo.marca.trim()) {
            newErrors.marca = 'A marca do veículo é obrigatória';
            valid = false;
        }

        if (!veiculo.proprietarioCPF.trim()) {
            newErrors.proprietarioCPF = 'O CPF do proprietário do veículo é obrigatório';
            valid = false;
        }

        if (!cpf.isValid(veiculo.proprietarioCPF)) {
            newErrors.proprietarioCPF = 'CPF inválido';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const [fetchError, setFetchError] = useState('');

    const CadastroVeiculo = () => {
        if (!validate()) {
            return;
        }

        const veiculoComAdmin = {
            ...veiculo,
            admin: 1,
        };

        const token = localStorage.getItem('token');
        Axios.post('http://localhost:8080/api/veiculo/', veiculoComAdmin, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
                setFetchError('');
                navigate('/');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar veículo:', error);
                setFetchError(error.message || 'Erro ao cadastrar veículo');
            });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className="cadastroVeiculo"
        >
            <h1>Cadastro de Veículos</h1>
            <div className="form">
                <TextField
                    id="outlined-placa"
                    label="Placa do Veículo"
                    name="placa"
                    value={veiculo.placa}
                    placeholder="Placa do veículo"
                    onChange={handleChange}
                    error={!!errors.placa}
                    helperText={errors.placa}
                />
                <TextField
                    id="outlined-cor"
                    label="Cor do Veículo"
                    name="cor"
                    value={veiculo.cor}
                    placeholder="Cor do veículo"
                    onChange={handleChange}
                    error={!!errors.cor}
                    helperText={errors.cor}
                />
                <TextField
                    id="outlined-estacionado"
                    select
                    label="O veículo está estacionado?"
                    name="estacionado"
                    value={veiculo.estacionado}
                    onChange={handleChange}
                >
                    {respostasEstacionado.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-tipo"
                    select
                    label="Tipo do Veículo"
                    name="tipo"
                    value={veiculo.tipo}
                    onChange={handleChange}
                >
                    {respostasTipo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-ano"
                    label="Ano do Veículo"
                    name="ano"
                    value={veiculo.ano}
                    placeholder="Ano do veículo"
                    onChange={handleChange}
                    error={!!errors.ano}
                    helperText={errors.ano}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                />
                <TextField
                    id="outlined-modelo"
                    label="Modelo do Veículo"
                    name="modelo"
                    value={veiculo.modelo}
                    placeholder="Modelo do veículo"
                    onChange={handleChange}
                    error={!!errors.modelo}
                    helperText={errors.modelo}
                />
                <TextField
                    id="outlined-marca"
                    label="Marca do Veículo"
                    name="marca"
                    value={veiculo.marca}
                    placeholder="Marca do veículo"
                    onChange={handleChange}
                    error={!!errors.marca}
                    helperText={errors.marca}
                />
                <TextField
                    id="outlined-proprietarioCPF"
                    label="CPF do proprietário do Veículo"
                    name="proprietarioCPF"
                    value={veiculo.proprietarioCPF}
                    placeholder="CPF do Proprietário do veículo"
                    onChange={handleChange}
                    error={!!errors.proprietarioCPF}
                    helperText={errors.proprietarioCPF}
                />
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={CadastroVeiculo}
                >
                    Send
                </Button>
                {fetchError && <p className="error">{fetchError}</p>}
            </div>
        </Box>
    );
}