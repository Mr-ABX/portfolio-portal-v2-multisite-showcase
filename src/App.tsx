import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PortalHub from './pages/PortalHub';

const PrismaProject = lazy(() => import('./pages/PrismaProject'));
const JackProject = lazy(() => import('./pages/JackProject'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<PortalHub />} />
          <Route path="/projects/prisma" element={<PrismaProject />} />
          <Route path="/projects/jack" element={<JackProject />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
