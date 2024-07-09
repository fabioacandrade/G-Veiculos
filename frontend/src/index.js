import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';


import Home from './routes/Home';
import CadastroVeiculo from './routes/CadastroVeiculo';
import CadastroProprietario from './routes/CadastroProprietario';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/login/Login';
import Register from './routes/login/Register';
import Usuario from './routes/Usuario';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/cadastro-veiculo/:cpf',
        element: <CadastroVeiculo />
      },
      {
        path: '/cadastro-veiculo',
        element: <CadastroVeiculo />
      },
      {
        path: '/cadastro-proprietario',
        element: <CadastroProprietario />
      },
      {
        path: '/perfil',
        element: <Usuario />

      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }

]);

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
