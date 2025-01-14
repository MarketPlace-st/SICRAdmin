import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import '../Estilos/Lotes.css';

function Lotes() {
    const navigate = useNavigate();

    const initialData = [
        {
            idLote: 'L111793',
            establecimiento: 'Matadero La Esperanza',
            codigoLote: 'COD-2024-001',
            fechaProduccion: '15/03/2024',
            origen: 'Vaca MOO',
            destinoFinal: 'Matadero'
        },
        {
            idLote: 'L596322',
            establecimiento: 'Planta Procesadora Verde',
            codigoLote: 'COD-2024-002',
            fechaProduccion: '14/03/2024',
            origen: 'Cerdo MOO',
            destinoFinal: 'Carnicerías'
        },
        {
            idLote: 'L587411',
            establecimiento: 'Frigorífico Frío Norte',
            codigoLote: 'COD-2024-003',
            fechaProduccion: '13/03/2024',
            origen: 'Cerdo MOO',
            destinoFinal: 'Distribuidores'
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.idLote.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.establecimiento.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        
        if (filters.supermercados || filters.carnicerias || filters.distribuidores) {
            filtered = filtered.filter(item => 
                (filters.supermercados && item.destinoFinal === 'Supermercados') ||
                (filters.carnicerias && item.destinoFinal === 'Carnicerías') ||
                (filters.distribuidores && item.destinoFinal === 'Distribuidores')
            );
        }

        setFilteredData(filtered);
    };

    const getDestinoColor = (destino) => {
        switch(destino) {
            case 'Supermercados':
                return 'blue';
            case 'Carnicerías':
                return 'green';
            case 'Distribuidores':
                return 'cyan';
            default:
                return 'gray';
        }
    };

    const columns = [
        { 
            header: 'CÓDIGO DE LOTE',
            key: 'codigoLote'
        },
        { 
            header: 'ESTABLECIMIENTO',
            key: 'establecimiento'
        },
        { 
            header: 'FECHA DE PRODUCCIÓN',
            key: 'fechaProduccion'
        },
        {
            header: 'ORIGEN',
            key: 'origen',
            render: (value) => (
                <Badge 
                    color="red"
                    variant="light"
                    size="sm"
                >
                    {value}
                </Badge>
            )
        },
        {
            header: 'DESTINO FINAL',
            key: 'destinoFinal',
            render: (value) => (
                <Badge 
                    color={getDestinoColor(value)}
                    variant="light"
                    size="sm"
                >
                    {value}
                </Badge>
            )
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/lotes/${row.idLote}`)}
                />
            )
        }
    ];

    return (
        <div className="lotes">
            <Header />
            <Menu />
            <div className="lotes-content">
                <SearchBar 
                    placeholder="Buscar por código o establecimiento"
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Destino Final"
                    filterOptions={[
                        { value: 'supermercados', label: 'Supermercados' },
                        { value: 'carnicerias', label: 'Carnicerías' },
                        { value: 'distribuidores', label: 'Distribuidores' }
                    ]}
                />
                <DataTable 
                    title="Lotes de Productos"
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </div>
    );
}

export default Lotes; 