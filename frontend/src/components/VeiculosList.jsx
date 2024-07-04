// VeiculosList.js
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useVeiculos } from '../VeiculosContext';
import axios from 'axios';
import './style/veiculosList.css';

const VeiculosList = () => {
    const { veiculos, fetchVeiculos, fetchListaVeiculos } = useVeiculos();

    const [valorHora, setValorHora] = useState(0);

    const columns = [
        { id: 'placa', label: 'Placa', minWidth: 170 },
        { id: 'tipo', label: 'Tipo', minWidth: 100 },
        { id: 'marca', label: 'Marca', minWidth: 100 },
        { id: 'modelo', label: 'Modelo', minWidth: 100 },
        { id: 'cor', label: 'Cor', minWidth: 100 },
        { id: 'ano', label: 'Ano', minWidth: 100 },
        { id: 'horaEntrada', label: 'Hora de Entrada', minWidth: 100 },
        { id: 'MarcarSaida', label: 'Marcar Saída', minWidth: 100 }
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const [veiculoSaida, setVeiculoSaida] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function marcarSaida(row) {
        setVeiculoSaida(row);
        handleOpen();
    }

    const marcarSaidaVeiculo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/veiculo/marcarSaida/${id}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchVeiculos();
            fetchListaVeiculos();
            handleClose();
        } catch (error) {
            console.error('Erro ao marcar saída:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect in VeiculosList called');
        fetchVeiculos();
    }, [fetchVeiculos]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function formatarDataIso8601(dataIso) {
        const data = new Date(dataIso);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

    function valorFinal(horaEntrada) {
        const dataEntrada = new Date(horaEntrada);
        const dataSaida = new Date();
        const diferenca = dataSaida - dataEntrada;
        const horas = Math.floor(diferenca / 3600000);
        const minutos = Math.floor((diferenca % 3600000) / 60000);
        const valor = horas * valorHora + (minutos * valorHora) / 60;
        return valor.toFixed(2);
    }

    return (
        <Paper sx={{ width: '75%', overflow: 'auto' }} className='Paper'>
            <div className='header'>
                <h1>VEÍCULOS ESTACIONADOS</h1>
                <div className='valor-hora'>
                    <Typography variant="h5" component="div">Valor da Hora:</Typography>
                    <TextField
                        type="number" value={valorHora} onChange={(e) => setValorHora(e.target.value)}
                        sx={{ ml: 2 }}
                    />
                </div>
            </div>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = column.id === 'horaEntrada' ? formatarDataIso8601(row[column.id]) : row[column.id];
                                        if (column.id === 'MarcarSaida') {
                                            return (
                                                <TableCell key={column.id} align="left" className={index % 2 === 0 ? 'Par' : 'Impar'}>
                                                    <Button variant='contained' color="success" onClick={() => marcarSaida(row)}>Marcar Saída</Button>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align="left" className={index % 2 === 0 ? 'Par' : 'Impar'}>
                                                {value ? value : '-'}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Marcar Saída do Veículo {veiculoSaida.placa} ?
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Valor a ser pago R$ {valorFinal(veiculoSaida.horaEntrada)}
                    </Typography>
                    
                    
                    <Button variant='contained' color="success" onClick={() => marcarSaidaVeiculo(veiculoSaida.id)}>Sim</Button>
                    <Button variant='contained' color="error" onClick={handleClose}>Não</Button>
                </Box>
            </Modal>
        </Paper>
    );
};

export default VeiculosList;
