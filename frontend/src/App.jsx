import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';


export default function App() {

    return (
        <div className='body'>
            <NavBar className='navbar'></NavBar>
            <Outlet />
        </div>
    );
}