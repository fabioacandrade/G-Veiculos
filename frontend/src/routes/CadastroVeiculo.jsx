import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './style/cadastroVeiculo.css';

export default function ValidationTextFields() {
    const navigate = useNavigate();
    const { cpf } = useParams();

    const [veiculo, setVeiculo] = useState({
        placa: '',
        cor: '',
        estacionado: true,
        tipo: 'carro',
        ano: '',
        modelo: '',
        marca: '',
        proprietarioCPF: cpf || '',
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

    const respostasCor = [
        {
            value: 'branco',
            label: 'Branco',
        },
        {
            value: 'preto',
            label: 'Preto',
        },
        {
            value: 'prata',
            label: 'Prata',
        },
        {
            value: 'azul',
            label: 'Azul',
        },
        {
            value: 'vermelho',
            label: 'Vermelho',
        },
        {
            value: 'verde',
            label: 'Verde',
        },
        {
            value: 'amarelo',
            label: 'Amarelo',
        },
        {
            value: 'rosa',
            label: 'Rosa',
        },
        {
            value: 'roxo',
            label: 'Roxo',
        },
        {
            value: 'laranja',
            label: 'Laranja',
        },
        {
            value: 'marrom',
            label: 'Marrom',
        },
        {
            value: 'cinza',
            label: 'Cinza',
        },
        {
            value: 'dourado',
            label: 'Dourado',
        },
        {
            value: 'prata',
            label: 'Prata',
        },
        {
            value: 'bege',
            label: 'Bege',
        },
        {
            value: 'grafite',
            label: 'Grafite',
        },
        {
            value: 'creme',
            label: 'Creme',
        },
        {
            value: 'vinho',
            label: 'Vinho',
        },
        {
            value: 'outro',
            label: 'Outro',
        },
    ]

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

        if (!cpfValidator.isValid(veiculo.proprietarioCPF)) {
            newErrors.proprietarioCPF = 'CPF inválido';
            valid = false;
        }

        if(!isProprietarioCadastrado(veiculo.proprietarioCPF)){
            newErrors.proprietarioCPF = 'Cadastre o proprietário antes de cadastrar o veículo.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };



    const isProprietarioCadastrado = async (cpf) => {
        try {
            const token = localStorage.getItem('token');
            const nomeUsuario = localStorage.getItem('nomeUsuario');
            const response = await Axios.get(`http://localhost:8080/api/proprietario/cpf/${cpf}/${nomeUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(response.data.cpf === cpf){
                console.log('response.data.cpf', response.data.cpf);
                return true;
            }
        } catch (error) {
            console.error('Proprietario não cadastrado', error);
            return false;
        }
    };

    const [fetchError, setFetchError] = useState('');

    const CadastroVeiculo = () => {
        if (!validate()) {
            return;
        }

        const adminNome = localStorage.getItem('nomeUsuario');

        const veiculoComAdmin = {
            ...veiculo,
            adminNome: adminNome,
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
                navigate('/home');
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
                '& .MuiTextField-root': { m: 1, width: '100%' },
                maxWidth: '800px',
                margin: 'auto',
                marginTop: '150px',
                padding: '20px',
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
            }}
            noValidate
            autoComplete="off"
            className="cadastroVeiculo"
        >
            <h1>Cadastro de Veículos</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-placa"
                        label="Placa do Veículo"
                        name="placa"
                        value={veiculo.placa}
                        placeholder="Placa do veículo"
                        onChange={handleChange}
                        error={!!errors.placa}
                        helperText={errors.placa}
                        inputProps={{ maxLength: 7 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-cor"
                        select
                        label="Cor do Veículo"
                        name="cor"
                        value={veiculo.cor}
                        placeholder="Cor do veículo"
                        onChange={handleChange}
                        error={!!errors.cor}
                        helperText={errors.cor}
                    >
                        {respostasCor.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-ano"
                        type='number'
                        label="Ano do Veículo"
                        name="ano"
                        value={veiculo.ano}
                        placeholder="Ano do veículo"
                        onChange={handleChange}
                        error={!!errors.ano}
                        helperText={errors.ano}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4  }}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                        
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-modelo"
                        label="Modelo do Veículo"
                        name="modelo"
                        value={veiculo.modelo}
                        placeholder="Modelo do veículo"
                        onChange={handleChange}
                        error={!!errors.modelo}
                        helperText={errors.modelo}
                        inputProps={{ maxLength: 30 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-marca"
                        label="Marca do Veículo"
                        name="marca"
                        value={veiculo.marca}
                        placeholder="Marca do veículo"
                        onChange={handleChange}
                        error={!!errors.marca}
                        inputProps={{ maxLength: 30 }}
                        helperText={errors.marca}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-proprietarioCPF"
                        label="CPF do proprietário do Veículo"
                        name="proprietarioCPF"
                        value={veiculo.proprietarioCPF}
                        placeholder="CPF do Proprietário do veículo"
                        onChange={handleChange}
                        error={!!errors.proprietarioCPF}
                        helperText={errors.proprietarioCPF}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 11  }}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                    />
                </Grid>
                <Grid item xs={12} sx={{display:"flex"
                , justifyContent:"center"
                , alignItems:"center"
                }}>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={CadastroVeiculo}
                        sx={{ m: 2, width: '100%' }}
                    >
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
            <Link to={'/cadastro-proprietario'}>Cadastrar Proprietário</Link>
            {fetchError && <p className="error">{fetchError}</p>}
        </Box>
    );
}
