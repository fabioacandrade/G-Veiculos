
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import './veiculosList.css';

const VeiculosList = () => {

    const columns = [
        { id: 'placa', label: 'Placa', minWidth: 170 },
        { id: 'tipo', label: 'Tipo', minWidth: 100 },
        { id: 'cor', label: 'Cor', minWidth: 100 },
        { id: 'ano', label: 'Ano', minWidth: 100 },
        { id: 'horaEntrada', label: 'Hora de Entrada', minWidth: 100 },
    ];


    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/veiculo');
                setVeiculos(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };

        fetchVeiculos();
    }, []);

    function formatarDataIso8601(dataIso) {
        // Converter a string ISO-8601 para objeto Date
        const data = new Date(dataIso);

        // Formatar a data para exibição mais bonita (exemplo simples)
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        // Retornar a data formatada como uma string
        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {veiculos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = column.id === 'horaEntrada' ? formatarDataIso8601(row[column.id]) : row[column.id];
                                        return (
                                            <TableCell key={column.id} align="left" className={row.id % 2 === 0 ? 'Par' : "Impar"}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={veiculos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );


};

export default VeiculosList;
