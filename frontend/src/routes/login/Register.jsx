import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../images/logo-no-background.png';
import { wait } from '@testing-library/user-event/dist/utils';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/fabioacandrade">
        Fábio Andrade
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { nome, senha, email }
      );

      if (response.status === 200) {
        setResponse("Usuário cadastrado com sucesso! Redirecionando...");
        wait(2000);
        window.location.href = '/login';
      }

    } catch (err) {
      if (err.response) {
        setErrors({ general: err.response.data });
      } else if (err.request) {
        setErrors({ general: "Erro de requisição" });
      } else {
        setErrors({ general: err.message });
      }
    }
  }

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!nome.trim()) {
      newErrors.nome = 'Nome do Usuário é obrigatório';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
      valid = false;
    }

    if (!senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
      valid = false;
    }

    if (!confirmarSenha.trim()) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
      valid = false;
    }

    if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar Usuário
            </Typography>
            {errors.general && <Typography variant="body2" color="error">{errors.general}</Typography>}
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome do Usuário"
                name="nome"
                autoComplete="username"
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={Boolean(errors.nome)}
                helperText={errors.nome}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                error={Boolean(errors.senha)}
                helperText={errors.senha}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmarSenha"
                label="Confirmar senha"
                type="password"
                id="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                error={Boolean(errors.confirmarSenha)}
                helperText={errors.confirmarSenha}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              {response && (
                <Typography variant="body2" color="success.main" align="center">
                  {response}
                </Typography>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Já tem uma conta? Fazer Login!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundColor: '#7DD0B6',
            backgroundSize: '50%', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
}
