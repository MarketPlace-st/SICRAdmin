import React from 'react';
import { 
    Paper, 
    Title, 
    Text, 
    Badge,
    Button,
    Modal
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetalleAlerta.css';

const DetalleAlerta = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modalEliminarAbierto, setModalEliminarAbierto] = React.useState(false);

    const handleEliminarAlerta = () => {
        // Aquí iría la lógica para eliminar la alerta
        navigate('/alertas');
    };

    return (
        <div className="detalle-alerta">
            <Header />
            <Menu />
            <div className="detalle-alerta-content">
                <Title order={2} mb="xl">Detalle de Alerta</Title>
                
                <Paper shadow="sm" p="xl" withBorder className="detalle-alerta-paper">
                    <div className="detalle-alerta-header">
                        <div>
                            <Text size="sm" color="dimmed">Código de Alerta</Text>
                            <Text size="lg" weight={500}>{id}</Text>
                        </div>
                        <Badge 
                            color="red" 
                            size="lg"
                            className="detalle-alerta-badge"
                        >
                            PENDIENTE
                        </Badge>
                    </div>

                    <div className="detalle-alerta-grid">
                        <div className="detalle-alerta-section">
                            <div className="detalle-alerta-section-title">
                                Tipo de Alerta
                            </div>
                            <div className="detalle-alerta-section-content">
                                Falta de Certificado
                            </div>
                        </div>

                        <div className="detalle-alerta-section">
                            <div className="detalle-alerta-section-title">
                                Prioridad
                            </div>
                            <div className="detalle-alerta-section-content">
                                Alta
                            </div>
                        </div>

                        <div className="detalle-alerta-section">
                            <div className="detalle-alerta-section-title">
                                Establecimiento
                            </div>
                            <div className="detalle-alerta-section-content">
                                Frigorífico Frío Norte
                            </div>
                        </div>

                        <div className="detalle-alerta-section">
                            <div className="detalle-alerta-section-title">
                                Fecha de Creación
                            </div>
                            <div className="detalle-alerta-section-content">
                                12/01/2025 14:30
                            </div>
                        </div>
                    </div>

                    <div className="detalle-alerta-irregularidad">
                        <div className="detalle-alerta-section-title">
                            Irregularidad Detectada
                        </div>
                        <Text>
                            El establecimiento no presentó el certificado de inocuidad 
                            actualizado en la última inspección.
                        </Text>
                    </div>

                    <div className="detalle-alerta-actions">
                        <Button variant="subtle" onClick={() => navigate('/alertas')}>
                            Volver
                        </Button>
                        <Button 
                            variant="light" 
                            color="red" 
                            onClick={() => setModalEliminarAbierto(true)}
                        >
                            Eliminar Alerta
                        </Button>
                        <Button 
                            color="red"
                            onClick={() => navigate(`/alertas/${id}/editar`)}
                        >
                            Editar Alerta
                        </Button>
                    </div>
                </Paper>

                <Modal
                    opened={modalEliminarAbierto}
                    onClose={() => setModalEliminarAbierto(false)}
                    title="Eliminar Alerta"
                    centered
                >
                    <Text mb="xl">
                        ¿Está seguro que desea eliminar esta alerta? Esta acción no se puede deshacer.
                    </Text>
                    <div className="detalle-alerta-modal-actions">
                        <Button 
                            variant="subtle" 
                            onClick={() => setModalEliminarAbierto(false)}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            color="red"
                            onClick={handleEliminarAlerta}
                        >
                            Eliminar
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default DetalleAlerta; 