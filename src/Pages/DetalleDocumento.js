import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Paper,
    Text,
    Badge,
    Group,
    ActionIcon,
    Title,
    Stack,
    Button
} from '@mantine/core';
import { 
    IconDownload,
    IconEye,
    IconTrash,
    IconCertificate,
    IconFileDescription,
    IconPlus
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetalleDocumento.css';

const DetalleDocumento = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estos datos vendrían de tu API
    const loteData = {
        id: id,
        establecimiento: 'Matadero La Esperanza',
        codigoLote: 'COD-2024-001',
        fechaEmision: '15/03/2024',
        documentos: [
            {
                id: 'doc1',
                tipo: 'Certificado Sanitario',
                numero: 'CS-2024-123',
                fecha: '15/03/2024',
                usuario: 'Juan Pérez',
                estado: 'VÁLIDO',
                url: 'https://ejemplo.com/doc1.pdf'
            },
            {
                id: 'doc2',
                tipo: 'Guía de Tránsito',
                numero: 'GT-2024-456',
                fecha: '15/03/2024',
                usuario: 'María López',
                estado: 'VÁLIDO',
                url: 'https://ejemplo.com/doc2.pdf'
            }
        ]
    };

    const handleDownload = (doc) => {
        // Aquí iría la lógica real de descarga
        const link = document.createElement('a');
        link.href = doc.url;
        link.download = `${doc.tipo}-${doc.numero}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleView = (doc) => {
        window.open(doc.url, '_blank');
    };

    const handleDelete = (docId) => {
        if (window.confirm('¿Está seguro que desea eliminar este documento?')) {
            // Aquí iría la lógica real de eliminación
            console.log('Eliminando documento:', docId);
        }
    };

    const handleAddDocument = () => {
        navigate(`/documentos/${id}/nuevo`);
    };

    return (
        <div className="detalle-documento">
            <Header />
            <Menu />
            <div className="documento-content">
                <Stack spacing="xl">
                    <Group position="apart">
                        <Title order={2}>Información del Lote</Title>
                        <Button
                            leftIcon={<IconPlus size={16} />}
                            color="red"
                            onClick={handleAddDocument}
                        >
                            Agregar Documento
                        </Button>
                    </Group>

                    <Paper shadow="sm" p="xl" withBorder className="info-section">
                        <Group spacing={50}>
                            <div>
                                <Text color="dimmed" size="sm">Establecimiento</Text>
                                <Text weight={500}>{loteData.establecimiento}</Text>
                            </div>
                            <div>
                                <Text color="dimmed" size="sm">Código de Lote</Text>
                                <Text weight={500}>{loteData.codigoLote}</Text>
                            </div>
                            <div>
                                <Text color="dimmed" size="sm">Fecha de Emisión</Text>
                                <Text weight={500}>{loteData.fechaEmision}</Text>
                            </div>
                        </Group>
                    </Paper>

                    <Title order={2} mt="xl">Documentos del Lote</Title>
                    
                    <div className="documentos-grid">
                        {loteData.documentos.map((doc) => (
                            <Paper 
                                key={doc.id} 
                                shadow="sm" 
                                p="xl" 
                                withBorder 
                                className="documento-item"
                            >
                                <Group position="apart" mb="md">
                                    <div className="documento-icon">
                                        {doc.tipo === 'Certificado Sanitario' ? 
                                            <IconCertificate size={24} /> : 
                                            <IconFileDescription size={24} />
                                        }
                                    </div>
                                    <Badge 
                                        color={doc.estado === 'VÁLIDO' ? 'green' : 'red'}
                                        variant="light"
                                        size="lg"
                                    >
                                        {doc.estado}
                                    </Badge>
                                </Group>

                                <Text weight={500} size="lg" mb="xs">{doc.tipo}</Text>
                                <Text weight={500} color="dimmed">{doc.numero}</Text>
                                
                                <Text size="sm" color="dimmed" mt="md">
                                    Subido el {doc.fecha} por {doc.usuario}
                                </Text>

                                <Group position="right" mt="xl" spacing="xs">
                                    <ActionIcon 
                                        variant="light" 
                                        color="blue" 
                                        onClick={() => handleView(doc)}
                                        size="lg"
                                    >
                                        <IconEye size={18} />
                                    </ActionIcon>
                                    <ActionIcon 
                                        variant="light" 
                                        color="green"
                                        onClick={() => handleDownload(doc)}
                                        size="lg"
                                    >
                                        <IconDownload size={18} />
                                    </ActionIcon>
                                    <ActionIcon 
                                        variant="light" 
                                        color="red"
                                        onClick={() => handleDelete(doc.id)}
                                        size="lg"
                                    >
                                        <IconTrash size={18} />
                                    </ActionIcon>
                                </Group>
                            </Paper>
                        ))}
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default DetalleDocumento; 