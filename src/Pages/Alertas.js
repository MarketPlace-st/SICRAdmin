import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import SearchBar from '../Componentes/SearchBar';
import DataTable from '../Componentes/DataTable';
import '../Estilos/Alertas.css';

const Alertas = () => {
    const navigate = useNavigate();
    
    const initialData = [
        {
            id: 'AL11793',
            fecha: '12/01/2025',
            tipo: 'Falta de Certificado',
            establecimiento: 'Frigorífico Frío Norte',
            prioridad: 'Alta',
            estado: 'Pendiente'
        },
        {
            id: 'AL6322',
            fecha: '12/01/2025',
            tipo: 'Retiro del Mercado',
            establecimiento: 'Planta Procesadora Verde',
            prioridad: 'Crítica',
            estado: 'En Proceso'
        },
        {
            id: 'AL87411',
            fecha: '11/01/2025',
            tipo: 'Infracción Sanitaria',
            establecimiento: 'Matadero La Esperanza',
            prioridad: 'Media',
            estado: 'Resuelta'
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.establecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        
        if (filters.pendiente || filters.proceso || filters.resuelta) {
            filtered = filtered.filter(item => 
                (filters.pendiente && item.estado === 'Pendiente') ||
                (filters.proceso && item.estado === 'En Proceso') ||
                (filters.resuelta && item.estado === 'Resuelta')
            );
        }
        setFilteredData(filtered);
    };

    const getEstadoColor = (estado) => {
        const colors = {
            'Pendiente': 'red',
            'En Proceso': 'yellow',
            'Resuelta': 'green'
        };
        return colors[estado] || 'gray';
    };

    const columns = [
        { 
            header: 'Fecha',
            key: 'fecha',
            className: 'fecha-column'
        },
        { 
            header: 'Tipo de Alerta',
            key: 'tipo',
            className: 'tipo-column'
        },
        { 
            header: 'Establecimiento',
            key: 'establecimiento',
            className: 'establecimiento-column'
        },
        {
            header: 'Estado',
            key: 'estado',
            render: (value) => (
                <Badge 
                    color={getEstadoColor(value)}
                    variant="light"
                    size="sm"
                    className="estado-badge"
                >
                    {value.toUpperCase()}
                </Badge>
            )
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/alertas/${row.id}`)}
                />
            )
        }
    ];

    return (
        <div className="alertas">
            <Header />
            <Menu />
            <div className="alertas-header">
                <Button
                    color="red"
                    leftIcon={<IconPlus size={16} />}
                    onClick={() => navigate('/alertas/nueva')}
                >
                    Nueva Alerta
                </Button>
            </div>

            <SearchBar 
                placeholder="Buscar por establecimiento o tipo"
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filterPlaceholder="Estado"
                filterOptions={[
                    { value: 'pendiente', label: 'Pendiente' },
                    { value: 'proceso', label: 'En Proceso' },
                    { value: 'resuelta', label: 'Resuelta' }
                ]}
            />

            <DataTable 
                title="Alertas"
                columns={columns}
                data={filteredData}
            />
        </div>
    );
};

export default Alertas; 