import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Paper,
    Title,
    Stack,
    Group,
    Button,
    TextInput,
    Textarea,
    Switch
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/Normativas.css';

const EditarNormativa = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simular datos de la normativa
    const normativaData = {
        id: id,
        codigo: 'NORM-2024-001',
        nombre: 'Normativa de Inocuidad Alimentaria',
        descripcion: 'Establece los criterios de inocuidad para establecimientos de sacrificio',
        estado: 'ACTIVO'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar la normativa usando el id
        console.log('Actualizando normativa:', id);
        navigate('/normativas');
    };

    return (
        <div className="normativas">
            <Header />
            <Menu />
            <div className="normativas-content">
                <Paper shadow="sm" p="xl" withBorder>
                    <Stack spacing="xl">
                        <Title order={2}>Editar Normativa</Title>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing="md">
                                <TextInput
                                    required
                                    label="Código"
                                    defaultValue={normativaData.codigo}
                                    readOnly
                                />

                                <TextInput
                                    required
                                    label="Nombre"
                                    defaultValue={normativaData.nombre}
                                />

                                <Textarea
                                    required
                                    label="Descripción"
                                    defaultValue={normativaData.descripcion}
                                    minRows={3}
                                />

                                <Switch
                                    label="Normativa Activa"
                                    defaultChecked={normativaData.estado === 'ACTIVO'}
                                />

                                <Group position="apart" mt="xl">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        onClick={() => navigate('/normativas')}
                                        leftIcon={<IconX size={16} />}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="green"
                                        leftIcon={<IconCheck size={16} />}
                                    >
                                        Guardar Cambios
                                    </Button>
                                </Group>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default EditarNormativa; 