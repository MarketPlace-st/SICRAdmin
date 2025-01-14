import React, { useState } from 'react';
import { 
    Button, 
    Group,
    ActionIcon,
    Badge,
    Menu,
    Paper,
    Text,
    Collapse,
    List,
    Divider,
    Title
} from '@mantine/core';
import { 
    IconPlus, 
    IconDots, 
    IconEdit, 
    IconTrash,
    IconClipboardList,
    IconChevronDown,
    IconChevronRight,
    IconListCheck
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import SideMenu from '../Componentes/Menu';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Normativas.css';

const Normativas = () => {
    const navigate = useNavigate();
    const [expandedNormativa, setExpandedNormativa] = useState(null);
    
    const initialData = [
        {
            id: '1',
            codigo: 'NORM-2024-001',
            nombre: 'Normativa de Inocuidad Alimentaria',
            descripcion: 'Establece los criterios de inocuidad para establecimientos de sacrificio',
            fechaCreacion: '15/03/2024',
            estado: 'ACTIVO',
            listas: [
                {
                    id: 'L1',
                    nombre: 'Infraestructura',
                    cantidadPreguntas: 15,
                    estado: 'ACTIVO'
                },
                {
                    id: 'L2',
                    nombre: 'Procesos Operativos',
                    cantidadPreguntas: 10,
                    estado: 'ACTIVO'
                }
            ]
        },
        {
            id: '2',
            codigo: 'NORM-2024-002',
            nombre: 'Normativa de Bienestar Animal',
            descripcion: 'Define los estándares de bienestar animal en el proceso de sacrificio',
            fechaCreacion: '14/03/2024',
            estado: 'ACTIVO',
            listas: [
                {
                    id: 'L3',
                    nombre: 'Manejo Pre-sacrificio',
                    cantidadPreguntas: 8,
                    estado: 'ACTIVO'
                }
            ]
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        if (filters.activo || filters.inactivo) {
            filtered = filtered.filter(item => 
                (filters.activo && item.estado === 'ACTIVO') ||
                (filters.inactivo && item.estado === 'INACTIVO')
            );
        }
        setFilteredData(filtered);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro que desea eliminar esta normativa y todas sus listas asociadas?')) {
            console.log('Eliminando normativa:', id);
        }
    };

    return (
        <div className="normativas">
            <Header />
            <SideMenu />
            <div className="normativas-content">
                <Group position="apart" mb="xl">
                    <Title order={2}>Normativas</Title>
                    <Button
                        color="red"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => navigate('/normativas/nueva')}
                    >
                        Nueva Normativa
                    </Button>
                </Group>

                <SearchBar 
                    placeholder="Buscar por código o nombre"
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Estado"
                    filterOptions={[
                        { value: 'activo', label: 'Activo' },
                        { value: 'inactivo', label: 'Inactivo' }
                    ]}
                />

                <div className="normativas-list">
                    {filteredData.map((normativa) => (
                        <Paper key={normativa.id} shadow="sm" p="md" withBorder mb="md">
                            <Group position="apart" mb="xs">
                                <div>
                                    <Text weight={500}>{normativa.codigo}</Text>
                                    <Text size="xl" weight={700}>{normativa.nombre}</Text>
                                </div>
                                <Group>
                                    <Badge 
                                        color={normativa.estado === 'ACTIVO' ? 'green' : 'red'}
                                        variant="light"
                                        size="lg"
                                    >
                                        {normativa.estado}
                                    </Badge>
                                    <Menu position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size={16} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item 
                                                icon={<IconEdit size={16} />}
                                                onClick={() => navigate(`/normativas/${normativa.id}/editar`)}
                                            >
                                                Editar Normativa
                                            </Menu.Item>
                                            <Menu.Item 
                                                icon={<IconPlus size={16} />}
                                                onClick={() => navigate(`/normativas/${normativa.id}/listas/nueva`)}
                                            >
                                                Agregar Lista
                                            </Menu.Item>
                                            <Menu.Item 
                                                icon={<IconTrash size={16} />}
                                                color="red"
                                                onClick={() => handleDelete(normativa.id)}
                                            >
                                                Eliminar Normativa
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Group>
                            
                            <Text color="dimmed" mb="md">{normativa.descripcion}</Text>
                            <Text size="sm" mb="md">Fecha de creación: {normativa.fechaCreacion}</Text>
                            
                            <Button
                                variant="subtle"
                                onClick={() => setExpandedNormativa(expandedNormativa === normativa.id ? null : normativa.id)}
                                rightIcon={expandedNormativa === normativa.id ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                                color="gray"
                            >
                                Listas de Verificación ({normativa.listas.length})
                            </Button>

                            <Collapse in={expandedNormativa === normativa.id}>
                                <List spacing="xs" mt="md">
                                    {normativa.listas.map((lista) => (
                                        <List.Item
                                            key={lista.id}
                                            icon={<IconListCheck size={16} />}
                                        >
                                            <Group position="apart">
                                                <div>
                                                    <Text weight={500}>{lista.nombre}</Text>
                                                    <Text size="sm" color="dimmed">
                                                        {lista.cantidadPreguntas} preguntas
                                                    </Text>
                                                </div>
                                                <Group spacing={8}>
                                                    <Badge 
                                                        color={lista.estado === 'ACTIVO' ? 'green' : 'red'}
                                                        variant="light"
                                                    >
                                                        {lista.estado}
                                                    </Badge>
                                                    <ActionIcon
                                                        color="blue"
                                                        onClick={() => navigate(`/normativas/${normativa.id}/listas/${lista.id}`)}
                                                    >
                                                        <IconClipboardList size={16} />
                                                    </ActionIcon>
                                                </Group>
                                            </Group>
                                            <Divider my="sm" />
                                        </List.Item>
                                    ))}
                                </List>
                            </Collapse>
                        </Paper>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Normativas; 