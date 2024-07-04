import React from 'react';
import VeiculosList from '../components/VeiculosList';
import BuscaVeiculo from '../components/BuscaVeiculo';
import NavBar from '../components/NavBar';
import { VeiculosProvider } from '../VeiculosContext';
import '../App.css';

export default function Home() {

    return (
        <VeiculosProvider>
            <div className='body'>
                <div className='content'>
                    <BuscaVeiculo className="busca" />
                    <VeiculosList className="lista" />
                </div>
            </div>
        </VeiculosProvider>
    );
}