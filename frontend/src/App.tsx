import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import SupplierRisk from '@/pages/SupplierRisk';
import ProductionRisk from '@/pages/ProductionRisk';
import Analytics from '@/pages/Analytics';
import Recommendations from '@/pages/Recommendations';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/supplier-risk" element={<SupplierRisk />} />
            <Route path="/production-risk" element={<ProductionRisk />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
