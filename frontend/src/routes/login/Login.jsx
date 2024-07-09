import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../images/logo-no-background.png';

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

export default function SignInSide() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get('nome');
    const senha = data.get('senha');

    setError('');

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { nome, senha }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('nomeUsuario', nome);

        if (
          signIn({
            auth: {
              token: token,
              type: 'Bearer '
            }
          })
        ) {
          navigate('/home');
        }
      }

    } catch (err) {
      if (err && err.response) {
        setError(err.response.data.message);
      } else if (err && err.request) {
        setError(err.request);
      } else if (err && err.message) {
        setError(err.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LogIn
            </Typography>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar-me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Fazer LogIn
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Não tem uma conta? Cadastre-se aqui"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
