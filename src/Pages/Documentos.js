import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Badge
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Documentos.css';

const Documentos = () => {
    const navigate = useNavigate();

    const initialData = [
        {
            id: 'EST-001',
            establecimiento: 'Matadero La Esperanza',
            codigoLote: 'COD-2024-001',
            fechaEmision: '15/03/2024',
            cantidadDocumentos: 2,
            estado: 'VÁLIDO',
            documentos: [
                {
                    tipo: 'Certificado Sanitario',
                    numero: 'CS-2024-123',
                    fecha: '15/03/2024',
                    estado: 'VÁLIDO'
                },
                {
                    tipo: 'Guía de Tránsito',
                    numero: 'GT-2024-456',
                    fecha: '15/03/2024',
                    estado: 'VÁLIDO'
                }
            ]
        },
        {
            id: 'EST-002',
            establecimiento: 'Planta Procesadora Verde',
            codigoLote: 'COD-2024-002',
            fechaEmision: '14/03/2024',
            cantidadDocumentos: 2,
            estado: 'NO VÁLIDO',
            documentos: [
                {
                    tipo: 'Certificado Sanitario',
                    numero: 'CS-2024-124',
                    fecha: '14/03/2024',
                    estado: 'NO VÁLIDO'
                },
                {
                    tipo: 'Guía de Tránsito',
                    numero: 'GT-2024-457',
                    fecha: '14/03/2024',
                    estado: 'VÁLIDO'
                }
            ]
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.codigoLote.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        
        if (filters.valido || filters.noValido) {
            filtered = filtered.filter(item => 
                (filters.valido && item.estado === 'VÁLIDO') ||
                (filters.noValido && item.estado === 'NO VÁLIDO')
            );
        }

        setFilteredData(filtered);
    };

    const columns = [
        { 
            header: 'ESTABLECIMIENTO',
            key: 'establecimiento'
        },
        { 
            header: 'CÓDIGO DE LOTE',
            key: 'codigoLote'
        },
        { 
            header: 'FECHA DE EMISIÓN',
            key: 'fechaEmision'
        },
        {
            header: 'DOCUMENTOS',
            key: 'cantidadDocumentos',
            render: (value) => `${value} documentos`
        },
        {
            header: 'ESTADO',
            key: 'estado',
            render: (value) => (
                <Badge 
                    color={value === 'VÁLIDO' ? 'green' : 'red'}
                    variant="light"
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
                    onClick={() => navigate(`/documentos/${row.id}`)}
                />
            )
        }
    ];

    return (
        <div className="documentos">
            <Header />
            <Menu />
            <div className="documentos-content">
                <SearchBar 
                    placeholder="Buscar por código de lote o número de documento"
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Estado"
                    filterOptions={[
                        { value: 'valido', label: 'Válido' },
                        { value: 'noValido', label: 'No Válido' }
                    ]}
                />
                <DataTable 
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </div>
    );
};

export default Documentos; 