import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Paper, 
    Title, 
    Text, 
    Group,
    Stack,
    Badge,
    Button,
    Table
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesLote.css';

const DetallesLote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estos datos vendrían de tu API
    const loteData = {
        idLote: id,
        codigoLote: 'COD-2024-001',
        descripcionProducto: 'Carne de res para consumo',
        fechaProduccion: '15/03/2024',
        origen: 'Vaca MOO',
        destinoFinal: 'Matadero',
        establecimiento: {
            nombre: 'Matadero La Esperanza',
            codigo: 'EST-001',
            direccion: 'Calle Principal 123, Cartago',
            telefono: '2550-0000',
            tipoEstablecimiento: 'Matadero'
        },
        detallesAnimal: {
            idAnimal: 'AN-2024-001',
            identificacionAnimal: 'BOV-123-2024',
            especie: 'Bovino',
            fechaSacrificio: '15/03/2024'
        },
        documentosAsociados: [
            { tipo: 'Certificado Sanitario', numero: 'CS-2024-123', estado: 'Vigente' },
            { tipo: 'Guía de Tránsito', numero: 'GT-2024-456', estado: 'Vigente' }
        ]
    };

    return (
        <div className="detalles-lote">
            <Header />
            <Menu />
            <div className="lote-content">
                <div className="content-header">
                    <Group>
                        <Button
                            variant="subtle"
                            color="gray"
                            leftIcon={<IconChevronLeft size={16} />}
                            onClick={() => navigate('/lotes')}
                        >
                            Volver
                        </Button>
                        <Title order={2}>Detalles del Lote</Title>
                    </Group>
                </div>

                <Paper shadow="sm" radius="md" p="xl" className="info-section">
                    <Stack spacing="xl">
                        <div>
                            <Text size="lg" weight={600} mb="md">Información del Establecimiento</Text>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td><Text weight={500}>Nombre:</Text></td>
                                        <td>{loteData.establecimiento.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Código:</Text></td>
                                        <td>{loteData.establecimiento.codigo}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Dirección:</Text></td>
                                        <td>{loteData.establecimiento.direccion}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Teléfono:</Text></td>
                                        <td>{loteData.establecimiento.telefono}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Tipo:</Text></td>
                                        <td>{loteData.establecimiento.tipoEstablecimiento}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Text size="lg" weight={600} mb="md">Información del Lote</Text>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td><Text weight={500}>Código de Lote:</Text></td>
                                        <td>{loteData.codigoLote}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Descripción:</Text></td>
                                        <td>{loteData.descripcionProducto}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Fecha de Producción:</Text></td>
                                        <td>{loteData.fechaProduccion}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Origen:</Text></td>
                                        <td>
                                            <Badge color="red" variant="light">
                                                {loteData.origen}
                                            </Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Destino Final:</Text></td>
                                        <td>
                                            <Badge color="blue" variant="light">
                                                {loteData.destinoFinal}
                                            </Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Text size="lg" weight={600} mb="md">Detalles del Animal</Text>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td><Text weight={500}>ID Animal:</Text></td>
                                        <td>{loteData.detallesAnimal.idAnimal}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Identificación:</Text></td>
                                        <td>{loteData.detallesAnimal.identificacionAnimal}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Especie:</Text></td>
                                        <td>{loteData.detallesAnimal.especie}</td>
                                    </tr>
                                    <tr>
                                        <td><Text weight={500}>Fecha de Sacrificio:</Text></td>
                                        <td>{loteData.detallesAnimal.fechaSacrificio}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <Text size="lg" weight={600} mb="md">Documentos Asociados</Text>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Tipo de Documento</th>
                                        <th>Número</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loteData.documentosAsociados.map((doc, index) => (
                                        <tr key={index}>
                                            <td>{doc.tipo}</td>
                                            <td>{doc.numero}</td>
                                            <td>
                                                <Badge 
                                                    color={doc.estado === 'Vigente' ? 'green' : 'red'}
                                                    variant="light"
                                                >
                                                    {doc.estado}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default DetallesLote; 