import React from 'react';
import { 
    Paper, 
    Title, 
    TextInput, 
    Select,
    Button, 
    Textarea
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/CrearAlerta.css';

const CrearAlerta = () => {
    const navigate = useNavigate();

    return (
        <div className="crear-alerta">
            <Header />
            <Menu />
            <div className="crear-alerta-content">
                <Title order={2} mb="xl">Nueva Alerta</Title>
                
                <Paper shadow="sm" p="xl" withBorder className="crear-alerta-form">
                    <form>
                        <div className="crear-alerta-section">
                            <div className="crear-alerta-section-title">
                                Información General
                            </div>
                            <div className="crear-alerta-grid">
                                <TextInput
                                    label="Código de Alerta"
                                    placeholder="Ingrese el código"
                                    required
                                />
                                <Select
                                    label="Tipo de Alerta"
                                    placeholder="Seleccione el tipo"
                                    data={[
                                        { value: 'certificado', label: 'Falta de Certificado' },
                                        { value: 'retiro', label: 'Retiro del Mercado' },
                                        { value: 'sanitaria', label: 'Infracción Sanitaria' }
                                    ]}
                                    required
                                />
                            </div>
                        </div>

                        <div className="crear-alerta-section">
                            <div className="crear-alerta-section-title">
                                Establecimiento
                            </div>
                            <div className="crear-alerta-grid">
                                <TextInput
                                    label="Establecimiento"
                                    placeholder="Nombre del establecimiento"
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
                                    required
                                />
                            </div>
                        </div>

                        <div className="crear-alerta-section">
                            <div className="crear-alerta-section-title">
                                Detalles de la Alerta
                            </div>
                            <div className="crear-alerta-grid">
                                <Select
                                    label="Prioridad"
                                    placeholder="Seleccione la prioridad"
                                    data={[
                                        { value: 'baja', label: 'Baja' },
                                        { value: 'media', label: 'Media' },
                                        { value: 'alta', label: 'Alta' },
                                        { value: 'critica', label: 'Crítica' }
                                    ]}
                                    required
                                />
                                <Select
                                    label="Estado Inicial"
                                    placeholder="Seleccione el estado"
                                    data={[
                                        { value: 'pendiente', label: 'Pendiente' },
                                        { value: 'proceso', label: 'En Proceso' }
                                    ]}
                                    required
                                />
                                <Textarea
                                    className="crear-alerta-full-width"
                                    label="Descripción de la Irregularidad"
                                    placeholder="Describa la irregularidad detectada"
                                    required
                                    minRows={3}
                                />
                            </div>
                        </div>

                        <div className="crear-alerta-actions">
                            <Button variant="subtle" onClick={() => navigate('/alertas')}>
                                Cancelar
                            </Button>
                            <Button color="red" type="submit">
                                Crear Alerta
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default CrearAlerta; 