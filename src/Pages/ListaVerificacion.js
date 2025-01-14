import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Button, 
  Stack,
  Group,
  Title,
  Text,
  Radio
} from '@mantine/core';
import { 
  IconChevronLeft,
  IconClipboardCheck
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/ListaVerificacion.css';

const ListaVerificacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState({});

  // Ejemplo de preguntas (esto vendría de tu API)
  const preguntas = [
    {
      id: 1,
      pregunta: '¿Las instalaciones están limpias y ordenadas?',
      observaciones: true
    },
    {
      id: 2,
      pregunta: '¿Existe un programa de mantenimiento preventivo?',
      observaciones: true
    },
    // ... más preguntas
  ];

  const handleRespuesta = (preguntaId, value) => {
    setRespuestas({
      ...respuestas,
      [preguntaId]: value
    });
  };

  return (
    <div className="lista-verificacion">
      <Header />
      <Menu />
      <div className="lista-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
            >
              Volver
            </Button>
            <Title order={2}>Lista de Verificación</Title>
          </Group>
        </div>

        <div className="preguntas-section">
          <Stack spacing="lg">
            {preguntas.map((pregunta) => (
              <Paper key={pregunta.id} p="xl" className="pregunta-item">
                <Stack spacing="lg">
                  <Group position="apart" align="flex-start">
                    <Text size="lg" weight={500} style={{ flex: 1 }}>
                      {pregunta.pregunta}
                    </Text>
                    <div className="radio-group-container">
                      <Radio.Group
                        value={respuestas[pregunta.id]}
                        onChange={(value) => handleRespuesta(pregunta.id, value)}
                      >
                        <Group spacing="sm">
                          <Radio 
                            value="cumple" 
                            label="Cumple"
                            classNames={{
                              label: 'radio-label',
                            }}
                          />
                          <Radio 
                            value="cumple_parcialmente" 
                            label="Cumple Parcialmente"
                            classNames={{
                              label: 'radio-label',
                            }}
                          />
                          <Radio 
                            value="no_cumple" 
                            label="No Cumple"
                            classNames={{
                              label: 'radio-label',
                            }}
                          />
                          <Radio 
                            value="no_aplica" 
                            label="No Aplica"
                            classNames={{
                              label: 'radio-label',
                            }}
                          />
                        </Group>
                      </Radio.Group>
                    </div>
                  </Group>
                  {pregunta.observaciones && (
                    <textarea
                      className="observaciones-input"
                      placeholder="Ingrese sus observaciones aquí..."
                      rows={3}
                    />
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>

          <div className="action-buttons">
            <Group position="right" spacing="md">
              <Button
                variant="outline"
                color="gray"
                onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
                size="md"
              >
                Cancelar
              </Button>
              <Button
                color="red"
                leftIcon={<IconClipboardCheck size={16} />}
                size="md"
              >
                Guardar Evaluación
              </Button>
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaVerificacion; 