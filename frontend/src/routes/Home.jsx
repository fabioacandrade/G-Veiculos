import React from 'react';
import VeiculosList from '../components/VeiculosList';
import { VeiculosProvider } from '../VeiculosContext';
import Buscas from './Buscas';
import '../App.css';

export default function Home() {

    return (
        <VeiculosProvider>
            <div className='body'>
                <div className='content'>
                    <Buscas className="buscas" />
                    <VeiculosList className="lista" />
                </div>
            </div>
        </VeiculosProvider>
    );
}