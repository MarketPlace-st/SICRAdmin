import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Paper,
    Title,
    Stack,
    Group,
    Button,
    TextInput,
    Select,
    FileInput,
    Text
} from '@mantine/core';
import { IconUpload, IconX, IconCheck } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/SubirDocumento.css';

const SubirDocumento = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        tipo: '',
        numero: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Aquí iría la lógica real de subida del documento
            const formDataToSend = new FormData();
            formDataToSend.append('file', file);
            formDataToSend.append('tipo', formData.tipo);
            formDataToSend.append('numero', formData.numero);
            formDataToSend.append('loteId', id);

            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Regresar a la página de detalles
            navigate(`/documentos/${id}`);
        } catch (error) {
            console.error('Error al subir documento:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subir-documento">
            <Header />
            <Menu />
            <div className="documento-content">
                <Paper shadow="sm" p="xl" withBorder>
                    <Stack spacing="xl">
                        <Title order={2}>Subir Nuevo Documento</Title>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing="md">
                                <Select
                                    required
                                    label="Tipo de Documento"
                                    placeholder="Seleccione el tipo de documento"
                                    value={formData.tipo}
                                    onChange={(value) => setFormData({...formData, tipo: value})}
                                    data={[
                                        { value: 'Certificado Sanitario', label: 'Certificado Sanitario' },
                                        { value: 'Guía de Tránsito', label: 'Guía de Tránsito' }
                                    ]}
                                />

                                <TextInput
                                    required
                                    label="Número de Documento"
                                    placeholder="Ingrese el número del documento"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                />

                                <FileInput
                                    required
                                    label="Archivo"
                                    placeholder="Seleccione el archivo PDF"
                                    accept="application/pdf"
                                    icon={<IconUpload size={14} />}
                                    value={file}
                                    onChange={setFile}
                                />

                                {file && (
                                    <Text size="sm" color="dimmed">
                                        Archivo seleccionado: {file.name}
                                    </Text>
                                )}

                                <Group position="apart" mt="xl">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        onClick={() => navigate(`/documentos/${id}`)}
                                        leftIcon={<IconX size={16} />}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="green"
                                        loading={loading}
                                        leftIcon={<IconCheck size={16} />}
                                    >
                                        Subir Documento
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

export default SubirDocumento; 