import React from 'react';
import { 
    Paper, 
    Title, 
    TextInput, 
    Select,
    Button, 
    Textarea
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/EditarAlerta.css';

const EditarAlerta = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simulación de datos de la alerta
    const alertaData = {
        codigo: 'AL11793',
        tipo: 'certificado',
        establecimiento: 'Frigorífico Frío Norte',
        tipoEstablecimiento: 'frigorifico',
        prioridad: 'alta',
        estado: 'pendiente',
        irregularidad: 'El establecimiento no presentó el certificado de inocuidad actualizado en la última inspección.'
    };

    return (
        <div className="editar-alerta">
            <Header />
            <Menu />
            <div className="editar-alerta-content">
                <Title order={2} mb="xl">Editar Alerta</Title>
                
                <Paper shadow="sm" p="xl" withBorder className="editar-alerta-form">
                    <form>
                        <div className="editar-alerta-section">
                            <div className="editar-alerta-section-title">
                                Información General
                            </div>
                            <div className="editar-alerta-grid">
                                <TextInput
                                    label="Código de Alerta"
                                    value={alertaData.codigo}
                                    disabled
                                />
                                <Select
                                    label="Tipo de Alerta"
                                    placeholder="Seleccione el tipo"
                                    data={[
                                        { value: 'certificado', label: 'Falta de Certificado' },
                                        { value: 'retiro', label: 'Retiro del Mercado' },
                                        { value: 'sanitaria', label: 'Infracción Sanitaria' }
                                    ]}
                                    value={alertaData.tipo}
                                    required
                                />
                            </div>
                        </div>

                        <div className="editar-alerta-section">
                            <div className="editar-alerta-section-title">
                                Establecimiento
                            </div>
                            <div className="editar-alerta-grid">
                                <TextInput
                                    label="Establecimiento"
                                    value={alertaData.establecimiento}
                                    required
                                />
                                <Select
                                    label="Tipo de Establecimiento"
                                    placeholder="Seleccione el tipo"
                                    data={[
                                        { value: 'matadero', label: 'Matadero' },
                                        { value: 'planta', label: 'Planta Procesadora' },
                                        { value: 'frigorifico', label: 'Frigorífico' }
                                    ]}
                                    value={alertaData.tipoEstablecimiento}
                                    required
                                />
                            </div>
                        </div>

                        <div className="editar-alerta-section">
                            <div className="editar-alerta-section-title">
                                Detalles de la Alerta
                            </div>
                            <div className="editar-alerta-grid">
                                <Select
                                    label="Prioridad"
                                    placeholder="Seleccione la prioridad"
                                    data={[
                                        { value: 'baja', label: 'Baja' },
                                        { value: 'media', label: 'Media' },
                                        { value: 'alta', label: 'Alta' },
                                        { value: 'critica', label: 'Crítica' }
                                    ]}
                                    value={alertaData.prioridad}
                                    required
                                />
                                <Select
                                    label="Estado"
                                    placeholder="Seleccione el estado"
                                    data={[
                                        { value: 'pendiente', label: 'Pendiente' },
                                        { value: 'proceso', label: 'En Proceso' },
                                        { value: 'resuelta', label: 'Resuelta' }
                                    ]}
                                    value={alertaData.estado}
                                    required
                                />
                                <Textarea
                                    className="editar-alerta-full-width"
                                    label="Descripción de la Irregularidad"
                                    placeholder="Describa la irregularidad detectada"
                                    value={alertaData.irregularidad}
                                    required
                                    minRows={3}
                                />
                            </div>
                        </div>

                        <div className="editar-alerta-actions">
                            <Button variant="subtle" onClick={() => navigate(`/alertas/${id}`)}>
                                Cancelar
                            </Button>
                            <Button color="red" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default EditarAlerta; 