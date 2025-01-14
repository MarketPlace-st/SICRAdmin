import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Paper,
    Text,
    Group,
    Button,
    ActionIcon,
    Title,
    Stack,
    Modal,
    TextInput,
    Textarea,
    Switch,
    Badge
} from '@mantine/core';
import { 
    IconPlus,
    IconEdit,
    IconTrash,
    IconArrowLeft
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import SideMenu from '../Componentes/Menu';
import '../Estilos/Normativas.css';

const DetallesLista = () => {
    const { normativaId, listaId } = useParams();
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editandoPregunta, setEditandoPregunta] = useState(null);

    // Datos de ejemplo
    const listaData = {
        id: listaId,
        nombre: 'Infraestructura',
        descripcion: 'Criterios de evaluación para la infraestructura',
        estado: 'ACTIVO',
        preguntas: [
            {
                id: 'P1',
                pregunta: '¿Las instalaciones cumplen con las dimensiones mínimas requeridas?',
                descripcion: 'Verificar que el espacio cumpla con las medidas establecidas en la normativa',
                obligatoria: true,
                estado: 'ACTIVO'
            },
            {
                id: 'P2',
                pregunta: '¿Existe una adecuada ventilación en las áreas de proceso?',
                descripcion: 'Comprobar la existencia y funcionamiento de sistemas de ventilación',
                obligatoria: true,
                estado: 'ACTIVO'
            }
        ]
    };

    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta: '',
        descripcion: '',
        obligatoria: true,
        estado: 'ACTIVO'
    });

    const handleGuardarPregunta = () => {
        if (editandoPregunta) {
            console.log('Actualizando pregunta:', editandoPregunta.id, nuevaPregunta);
        } else {
            console.log('Creando nueva pregunta:', nuevaPregunta);
        }
        setModalAbierto(false);
        setEditandoPregunta(null);
        setNuevaPregunta({
            pregunta: '',
            descripcion: '',
            obligatoria: true,
            estado: 'ACTIVO'
        });
    };

    const handleEditarPregunta = (pregunta) => {
        setEditandoPregunta(pregunta);
        setNuevaPregunta({
            pregunta: pregunta.pregunta,
            descripcion: pregunta.descripcion,
            obligatoria: pregunta.obligatoria,
            estado: pregunta.estado
        });
        setModalAbierto(true);
    };

    const handleEliminarPregunta = (preguntaId) => {
        if (window.confirm('¿Está seguro que desea eliminar esta pregunta?')) {
            console.log('Eliminando pregunta:', preguntaId);
        }
    };

    return (
        <div className="normativas">
            <Header />
            <SideMenu />
            <div className="normativas-content">
                <Group position="apart" mb="xl">
                    <Group>
                        <ActionIcon 
                            variant="subtle" 
                            onClick={() => navigate(`/normativas`)}
                        >
                            <IconArrowLeft size={16} />
                        </ActionIcon>
                        <div>
                            <Title order={2}>{listaData.nombre}</Title>
                            <Text color="dimmed">
                                <Text component="span" weight={500}>NORM-{normativaId}</Text> - {listaData.descripcion}
                            </Text>
                        </div>
                    </Group>
                    <Button
                        color="red"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => {
                            setEditandoPregunta(null);
                            setModalAbierto(true);
                        }}
                    >
                        Agregar Pregunta
                    </Button>
                </Group>

                <Stack spacing="md">
                    {listaData.preguntas.map((pregunta) => (
                        <Paper key={pregunta.id} shadow="sm" p="md" withBorder>
                            <Group position="apart" mb="xs">
                                <div style={{ flex: 1 }}>
                                    <Group spacing="xs" mb="xs">
                                        <Badge 
                                            color={pregunta.estado === 'ACTIVO' ? 'green' : 'red'}
                                            variant="light"
                                        >
                                            {pregunta.estado}
                                        </Badge>
                                        {pregunta.obligatoria && (
                                            <Badge color="red" variant="light">
                                                Obligatoria
                                            </Badge>
                                        )}
                                    </Group>
                                    <Text weight={500} size="lg">{pregunta.pregunta}</Text>
                                    <Text color="dimmed" size="sm" mt="xs">
                                        {pregunta.descripcion}
                                    </Text>
                                </div>
                                <Group spacing={8}>
                                    <ActionIcon
                                        color="blue"
                                        variant="light"
                                        onClick={() => handleEditarPregunta(pregunta)}
                                        title="Editar"
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        onClick={() => handleEliminarPregunta(pregunta.id)}
                                        title="Eliminar"
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Paper>
                    ))}
                </Stack>

                <Modal
                    opened={modalAbierto}
                    onClose={() => {
                        setModalAbierto(false);
                        setEditandoPregunta(null);
                        setNuevaPregunta({
                            pregunta: '',
                            descripcion: '',
                            obligatoria: true,
                            estado: 'ACTIVO'
                        });
                    }}
                    title={editandoPregunta ? "Editar Pregunta" : "Nueva Pregunta"}
                    size="lg"
                    centered
                    styles={{
                        title: {
                            fontSize: '1.2rem',
                            fontWeight: 600
                        },
                        body: {
                            padding: '20px'
                        }
                    }}
                    overlayProps={{
                        opacity: 0.55,
                        blur: 3
                    }}
                >
                    <Stack spacing="md">
                        <TextInput
                            required
                            label="Pregunta"
                            placeholder="Escriba la pregunta"
                            value={nuevaPregunta.pregunta}
                            size="md"
                            onChange={(e) => setNuevaPregunta({
                                ...nuevaPregunta,
                                pregunta: e.target.value
                            })}
                        />

                        <Textarea
                            label="Descripción"
                            placeholder="Descripción o instrucciones adicionales"
                            value={nuevaPregunta.descripcion}
                            size="md"
                            onChange={(e) => setNuevaPregunta({
                                ...nuevaPregunta,
                                descripcion: e.target.value
                            })}
                            minRows={3}
                        />

                        <Group position="apart">
                            <Switch
                                size="md"
                                label="Pregunta Obligatoria"
                                checked={nuevaPregunta.obligatoria}
                                onChange={(e) => setNuevaPregunta({
                                    ...nuevaPregunta,
                                    obligatoria: e.currentTarget.checked
                                })}
                            />

                            <Switch
                                size="md"
                                label="Activa"
                                checked={nuevaPregunta.estado === 'ACTIVO'}
                                onChange={(e) => setNuevaPregunta({
                                    ...nuevaPregunta,
                                    estado: e.currentTarget.checked ? 'ACTIVO' : 'INACTIVO'
                                })}
                            />
                        </Group>

                        <Group position="right" mt="xl">
                            <Button 
                                variant="subtle" 
                                size="md"
                                onClick={() => setModalAbierto(false)}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                color="green"
                                size="md"
                                onClick={handleGuardarPregunta}
                            >
                                {editandoPregunta ? 'Guardar Cambios' : 'Crear Pregunta'}
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </div>
        </div>
    );
};

export default DetallesLista; 