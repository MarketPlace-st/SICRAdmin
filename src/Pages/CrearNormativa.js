import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const CrearNormativa = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para crear la normativa
        navigate('/normativas');
    };

    return (
        <div className="normativas">
            <Header />
            <Menu />
            <div className="normativas-content">
                <Paper shadow="sm" p="xl" withBorder>
                    <Stack spacing="xl">
                        <Title order={2}>Nueva Normativa</Title>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing="md">
                                <TextInput
                                    required
                                    label="Código"
                                    placeholder="Ej: NORM-2024-001"
                                />

                                <TextInput
                                    required
                                    label="Nombre"
                                    placeholder="Nombre de la normativa"
                                />

                                <Textarea
                                    required
                                    label="Descripción"
                                    placeholder="Descripción detallada de la normativa"
                                    minRows={3}
                                />

                                <Switch
                                    label="Normativa Activa"
                                    defaultChecked
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
                                        Guardar Normativa
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

export default CrearNormativa; 