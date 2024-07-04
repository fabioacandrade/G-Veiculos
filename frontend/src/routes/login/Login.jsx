import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export default function Login() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onSubmit = async (event) => {
    event.preventDefault(); // previne o comportamento padrão de submissão do formulário
    console.log("Values: ", { nome, senha });
    setError('');

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { nome, senha }
      );

      if(response.status === 200){
        const token = response.data.token;
        localStorage.setItem('token', token); // Armazena o token no local storage

        if(
          signIn({
            auth: {
                token: token,
                type: 'Bearer '
            }
          })
        ) {
          console.log(localStorage.getItem('token'));
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
      console.log("Error: ", err);
    }
  }

  return (
    <div className="container">
      <div className="inner-container">
        <form onSubmit={onSubmit}>
          <h1>Welcome Back!</h1>
          {error && <div className="error-text">{error}</div>}
          <div className="input-wrapper">
            <input
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="input-wrapper">
            <input
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="input-wrapper">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
