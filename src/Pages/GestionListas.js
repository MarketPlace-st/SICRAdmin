import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Title,
    Group,
    Button,
    Text,
    ActionIcon,
    Menu,
    Badge
} from '@mantine/core';
import { 
    IconPlus, 
    IconDots, 
    IconEdit, 
    IconTrash,
    IconClipboardCheck
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import SideMenu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import '../Estilos/Normativas.css';

const GestionListas = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const listas = [
        {
            id: '1',
            nombre: 'Lista de Verificación de Inocuidad',
            descripcion: 'Criterios de evaluación para la inocuidad alimentaria',
            cantidadPreguntas: 15,
            estado: 'ACTIVO'
        },
        {
            id: '2',
            nombre: 'Lista de Verificación de Infraestructura',
            descripcion: 'Evaluación de instalaciones y equipamiento',
            cantidadPreguntas: 10,
            estado: 'ACTIVO'
        }
    ];

    const handleDelete = (listaId) => {
        if (window.confirm('¿Está seguro que desea eliminar esta lista?')) {
            console.log('Eliminando lista:', listaId);
        }
    };

    const columns = [
        { 
            header: 'NOMBRE',
            key: 'nombre'
        },
        { 
            header: 'DESCRIPCIÓN',
            key: 'descripcion'
        },
        {
            header: 'PREGUNTAS',
            key: 'cantidadPreguntas',
            render: (value) => `${value} preguntas`
        },
        {
            header: 'ESTADO',
            key: 'estado',
            render: (value) => (
                <Badge 
                    color={value === 'ACTIVO' ? 'green' : 'red'}
                    variant="light"
                >
                    {value}
                </Badge>
            )
        },
        {
            header: '',
            key: 'actions',
            render: (_, row) => (
                <Group spacing={0} position="right">
                    <ActionIcon
                        color="blue"
                        onClick={() => navigate(`/normativas/${id}/listas/${row.id}/preguntas`)}
                    >
                        <IconClipboardCheck size={16} />
                    </ActionIcon>
                    <Menu position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item 
                                icon={<IconEdit size={16} />}
                                onClick={() => navigate(`/normativas/${id}/listas/${row.id}/editar`)}
                            >
                                Editar
                            </Menu.Item>
                            <Menu.Item 
                                icon={<IconTrash size={16} />}
                                color="red"
                                onClick={() => handleDelete(row.id)}
                            >
                                Eliminar
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            )
        }
    ];

    return (
        <div className="normativas">
            <Header />
            <SideMenu />
            <div className="normativas-content">
                <Group position="apart" mb="xl">
                    <div>
                        <Title order={2}>Listas de Verificación</Title>
                        <Text color="dimmed">Normativa: NORM-2024-001</Text>
                    </div>
                    <Button
                        color="red"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => navigate(`/normativas/${id}/listas/nueva`)}
                    >
                        Nueva Lista
                    </Button>
                </Group>

                <DataTable 
                    columns={columns}
                    data={listas}
                />
            </div>
        </div>
    );
};

export default GestionListas; 