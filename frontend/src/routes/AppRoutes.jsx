import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import PrivateRoute from './PrivateRoute';
import Loading from '../components/Loading';

// Páginas públicas
const Home = lazy(() => import('../pages/Home'));
const SobreNos = lazy(() => import('../pages/SobreNos'));
const Sacramentos = lazy(() => import('../pages/Sacramentos'));
const HorarioMissas = lazy(() => import('../pages/HorarioMissas'));
const Eventos = lazy(() => import('../pages/Eventos'));
const Noticias = lazy(() => import('../pages/Noticias'));
const NoticiaDetalhe = lazy(() => import('../pages/NoticiaDetalhe'));
const Galeria = lazy(() => import('../pages/Galeria'));
const Videos = lazy(() => import('../pages/Videos'));
const Avisos = lazy(() => import('../pages/Avisos'));
const Contato = lazy(() => import('../pages/Contato'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Páginas admin
const AdminLogin = lazy(() => import('../pages/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const AdminAvisos = lazy(() => import('../pages/AdminAvisos'));
const AdminEventos = lazy(() => import('../pages/AdminEventos'));
const AdminNoticias = lazy(() => import('../pages/AdminNoticias'));
const AdminGaleria = lazy(() => import('../pages/AdminGaleria'));
const AdminVideos = lazy(() => import('../pages/AdminVideos'));
const AdminContatos = lazy(() => import('../pages/AdminContatos'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rotas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/sacramentos" element={<Sacramentos />} />
          <Route path="/horarios" element={<HorarioMissas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        {/* Admin login (pública) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rotas admin (protegidas) */}
        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/avisos" element={<AdminAvisos />} />
          <Route path="/admin/eventos" element={<AdminEventos />} />
          <Route path="/admin/noticias" element={<AdminNoticias />} />
          <Route path="/admin/galeria" element={<AdminGaleria />} />
          <Route path="/admin/videos" element={<AdminVideos />} />
          <Route path="/admin/contatos" element={<AdminContatos />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
