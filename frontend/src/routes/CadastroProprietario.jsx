import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import { cpf } from 'cpf-cnpj-validator';
import { useNavigate, Link } from 'react-router-dom';
import './style/cadastroVeiculo.css';

export default function ValidationTextFields() {

    const navigate = useNavigate();

    const [proprietario, setproprietario] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        numero: '',
    });

    const [errors, setErrors] = useState({});
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        // Fetch states from IBGE API
        Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then((response) => {
                const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setEstados(estadosOrdenados);
            })
            .catch((error) => {
                console.error('Erro ao buscar estados:', error);
                setFetchError(error.message || 'Erro ao buscar estados');
            });
    }, []);

    const handleEstadoChange = (e) => {
        const estadoSelecionado = e.target.value;
        setproprietario({ ...proprietario, estado: estadoSelecionado });

        // Fetch cities for the selected state from IBGE API
        Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then((response) => {
                const cidadesOrdenadas = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(cidadesOrdenadas);
            })
            .catch((error) => {
                console.error('Erro ao buscar cidades:', error);
                setFetchError(error.message || 'Erro ao buscar cidades');
            });
    };

    const handleCepChange = (e) => {
        const cep = e.target.value;
        setproprietario({ ...proprietario, cep });

        if (cep.length === 8) {
            // Fetch address data from ViaCEP API
            Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    const data = response.data;
                    if (!data.erro) {
                        setproprietario({
                            ...proprietario,
                            endereco: data.logradouro,
                            cidade: data.localidade,
                            estado: data.uf,
                            cep: cep,
                        });

                        // Fetch cities for the state from IBGE API
                        Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data.uf}/municipios`)
                            .then((response) => {
                                const cidadesOrdenadas = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                                setCidades(cidadesOrdenadas);
                            })
                            .catch((error) => {
                                console.error('Erro ao buscar cidades:', error);
                                setFetchError(error.message || 'Erro ao buscar cidades');
                            });
                    } else {
                        setFetchError('CEP não encontrado');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar endereço pelo CEP:', error);
                    setFetchError(error.message || 'Erro ao buscar endereço pelo CEP');
                });
        }
    };

    const validate = () => {
        const newErrors = {};
        let valid = true;

        if (!proprietario.nome) {
            newErrors.nome = 'O nome é obrigatório';
            valid = false;
        }

        if (!proprietario.cpf) {
            newErrors.cpf = 'O CPF é obrigatório';
            valid = false;
        } else if (!cpf.isValid(proprietario.cpf)) {
            newErrors.cpf = 'CPF inválido';
            valid = false;
        }

        if (!proprietario.email) {
            newErrors.email = 'O email é obrigatório';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(proprietario.email)) {
            newErrors.email = 'O email não é válido';
            valid = false;
        }

        if (!proprietario.telefone) {
            newErrors.telefone = 'O telefone é obrigatório';
            valid = false;
        } else if (!/^\d{10,11}$/.test(proprietario.telefone)) {
            newErrors.telefone = 'O telefone deve ter 10 ou 11 dígitos';
            valid = false;
        }

        if (!proprietario.endereco) {
            newErrors.endereco = 'O endereço é obrigatório';
            valid = false;
        }

        if (!proprietario.numero) {
            newErrors.numero = 'O número é obrigatório';
            valid = false;
        }
        
        if (!proprietario.cidade) {
            newErrors.cidade = 'A cidade é obrigatória';
            valid = false;
        }

        if (!proprietario.estado) {
            newErrors.estado = 'O estado é obrigatório';
            valid = false;
        }

        if (!proprietario.cep) {
            newErrors.cep = 'O CEP é obrigatório';
            valid = false;
        } else if (!/^\d{8}$/.test(proprietario.cep)) {
            newErrors.cep = 'O CEP deve ter 8 dígitos';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const cadastroProprietario = () => {
        if (!validate()) {
            return;
        }
        const token = localStorage.getItem('token');
        Axios.post(`http://localhost:8080/api/proprietario/`, proprietario , {
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
                console.error('Erro ao cadastrar proprietario:', error);
                if (error.message.includes('500')) {
                    setFetchError('Proprietário já cadastrado');
                } else {
                    setFetchError(error.message || 'Erro ao cadastrar proprietario');
                }
            });
    };

    return (
        <Box component="form"
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
                minHeight: '50vh',  // Ensure it takes the full height of the viewport
            }}
            noValidate
            autoComplete="off"
            className='cadastroVeiculo'>
            <h1>Cadastro de Proprietário</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="Nome"
                        value={proprietario.nome}
                        onChange={(e) => setproprietario({ ...proprietario, nome: e.target.value })}
                        error={!!errors.nome}
                        helperText={errors.nome}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="CPF"
                        value={proprietario.cpf}
                        onChange={(e) => setproprietario({ ...proprietario, cpf: e.target.value })}
                        error={!!errors.cpf}
                        helperText={errors.cpf}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="Email"
                        value={proprietario.email}
                        onChange={(e) => setproprietario({ ...proprietario, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="Telefone"
                        value={proprietario.telefone}
                        onChange={(e) => setproprietario({ ...proprietario, telefone: e.target.value })}
                        error={!!errors.telefone}
                        helperText={errors.telefone}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="CEP"
                        value={proprietario.cep}
                        onChange={handleCepChange}
                        error={!!errors.cep}
                        helperText={errors.cep}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="text"
                        placeholder="Endereço"
                        value={proprietario.endereco}
                        onChange={(e) => setproprietario({ ...proprietario, endereco: e.target.value })}
                        error={!!errors.endereco}
                        helperText={errors.endereco}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        type="number"
                        placeholder="Número"
                        value={proprietario.numero}
                        onChange={(e) => setproprietario({ ...proprietario, numero: e.target.value })}
                        error={!!errors.numero}
                        helperText={errors.numero}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        label="Estado"
                        value={proprietario.estado}
                        onChange={handleEstadoChange}
                        error={!!errors.estado}
                        helperText={errors.estado}
                    >
                        {estados.map((estado) => (
                            <MenuItem key={estado.id} value={estado.sigla}>
                                {estado.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        label="Cidade"
                        value={proprietario.cidade}
                        onChange={(e) => setproprietario({ ...proprietario, cidade: e.target.value })}
                        disabled={!cidades.length}
                        error={!!errors.cidade}
                        helperText={errors.cidade}
                    >
                        {cidades.map((cidade) => (
                            <MenuItem key={cidade.id} value={cidade.nome}>
                                {cidade.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={12} sx={{display:"flex"
                , justifyContent:"center"
                , alignItems:"center"
                }}>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={cadastroProprietario}
                        sx={{ m: 2, width: '100%' }}
                    >
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
            <Link to={'/cadastro-veiculo'} style={{}}>Cadastrar Veículo</Link>
            {fetchError && <Alert severity="error">{fetchError}</Alert>}
        </Box>
    );
}
