import React from 'react';
import BuscaVeiculo from '../components/BuscaVeiculo';
import BuscaProprietario from '../components/BuscaProprietario';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab } from '@mui/material';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Buscas() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{

        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Buscar Veículos" {...a11yProps(0)} />
                    <Tab label="Buscar Proprietário" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <BuscaVeiculo />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <BuscaProprietario/>
            </CustomTabPanel>
        </Box>
    )
}