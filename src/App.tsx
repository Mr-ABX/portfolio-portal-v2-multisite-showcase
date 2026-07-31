import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PortalHub from './pages/PortalHub';
import FloatingBackButton from './components/FloatingBackButton';
import ScrollToTop from './components/ScrollToTop';

const PrismaProject = lazy(() => import('./pages/PrismaProject'));
const JackProject = lazy(() => import('./pages/JackProject'));
const SynapseXProject = lazy(() => import('./pages/SynapseXProject'));
const NeoMuseumProject = lazy(() => import('./pages/NeoMuseumProject'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <FloatingBackButton />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<PortalHub />} />
          <Route path="/projects/prisma" element={<PrismaProject />} />
          <Route path="/projects/jack" element={<JackProject />} />
          <Route path="/projects/synapsex" element={<SynapseXProject />} />
          <Route path="/projects/neomuseum" element={<NeoMuseumProject />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
