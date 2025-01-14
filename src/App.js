import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Dashboard from './Pages/DashBoard';
import Solicitudes from './Pages/Solicitudes';
import AsignarInspector from './Pages/AsignarInspector';
import DetallesSolicitudes from './Pages/DetallesSolicitudes';
import Establecimiento from './Pages/Establecimiento';
import DetallesEstablecimientos from './Pages/DetallesEstablecimientos';
import EditarEstablecimiento from './Pages/EditarEstablecimiento';
import Inspecciones from './Pages/Inspecciones';
import DetallesInspeccion from './Pages/DetallesInspeccion';
import EvaluarInspeccion from './Pages/EvaluarInspeccion';
import ListaVerificacion from './Pages/ListaVerificacion';
import Resultados from './Pages/Resultados';
import DetallesResultados from './Pages/DetallesResultados';
import Irregularidades from './Pages/Irregularidades';
import Sanciones from './Pages/Sanciones';
import DetallesSanciones from './Pages/DetallesSanciones';
import AgregarSancion from './Pages/AgregarSancion';
import Usuarios from './Pages/Usuarios';
import DetallesUsuario from './Pages/DetallesUsuario';
import EditarUsuario from './Pages/EditarUsuario';
import AgregarUsuario from './Pages/AgregarUsuario';
import InspeccionesPendientes from './Pages/InspeccionesPendientes';
import InspeccionCreada from './Pages/InspeccionCreada';
import Login from './Pages/Login';
import MiPerfil from './Pages/MiPerfil';
import Documentos from './Pages/Documentos';
import Lotes from './Pages/Lotes';
import DetallesLote from './Pages/DetallesLote';
import DetalleDocumento from './Pages/DetalleDocumento';
import SubirDocumento from './Pages/SubirDocumento';
import Normativas from './Pages/Normativas';
import CrearNormativa from './Pages/CrearNormativa';
import EditarNormativa from './Pages/EditarNormativa';
import DetallesLista from './Pages/DetallesLista';
import Alertas from './Pages/Alertas';
import DetalleAlerta from './Pages/DetalleAlerta';
import CrearAlerta from './Pages/CrearAlerta';
import EditarAlerta from './Pages/EditarAlerta';


function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'red',
        colors: {
          red: ['#FFE3E3', '#FFB1B1', '#FF7F7F', '#FF4C4C', '#FF1A1A', '#D94A3D', '#B30000', '#800000', '#4C0000', '#190000']
        }
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <div className="app">
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/solicitudes/asignar-inspector/:id" element={<AsignarInspector />} />
              <Route path="/detalles-solicitud/:id" element={<DetallesSolicitudes />} />
              <Route path="/establecimientos" element={<Establecimiento />} />
              <Route path="/establecimientos/:id" element={<DetallesEstablecimientos />} />
              <Route path="/establecimientos/editar/:id" element={<EditarEstablecimiento />} />
              <Route path="/inspecciones" element={<Inspecciones />} />
              <Route path="/inspecciones/:id" element={<DetallesInspeccion />} />
              <Route path="/inspecciones/:id/evaluar" element={<EvaluarInspeccion />} />
              <Route path="/inspecciones/:id/evaluar/:normativaId/:listaId" element={<ListaVerificacion />} />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/resultados/:id" element={<DetallesResultados />} />
              <Route path="/resultados/:id/irregularidades" element={<Irregularidades />} />
              <Route path="/sanciones" element={<Sanciones />} />
              <Route path="/sanciones/:id" element={<DetallesSanciones />} />
              <Route path="/sanciones/agregar" element={<AgregarSancion />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/:id" element={<DetallesUsuario />} />
              <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
              <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
              <Route path="/establecimientos/pendientes" element={<InspeccionesPendientes />} />
              <Route path="/inspecciones/:id/asignar" element={<InspeccionCreada />} />
              <Route path="/mi-perfil" element={<MiPerfil />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/documentos/:id" element={<DetalleDocumento />} />
              <Route path="/documentos/:id/nuevo" element={<SubirDocumento />} />
              <Route path="/lotes" element={<Lotes />} />
              <Route path="/lotes/:id" element={<DetallesLote />} />
              <Route path="/normativas" element={<Normativas />} />
              <Route path="/normativas/nueva" element={<CrearNormativa />} />
              <Route path="/normativas/:id/editar" element={<EditarNormativa />} />
              <Route path="/normativas/:normativaId/listas/:listaId" element={<DetallesLista />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/alertas/:id" element={<DetalleAlerta />} />
              <Route path="/alertas/nueva" element={<CrearAlerta />} />
              <Route path="/alertas/:id/editar" element={<EditarAlerta />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
