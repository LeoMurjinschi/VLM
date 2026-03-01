import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DonationFeed from './pages/DonationFeed';
import AddStock from './pages/AddStock';
import CurrentInventory from './pages/CurrentInventory';
import { ThemeProvider } from './context/ThemeContext';
import { InventoryProvider } from './context/InventoryContext'; 
import ToastProvider from './components/UI/ToastProvider';
import DonorDashboard from './pages/DonorDashboard';

function App() {
  return (
    <ThemeProvider>
      <InventoryProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/feed" replace />} />
                <Route path="feed" element={<DonationFeed />} />
                <Route path="dashboard" element={<DonorDashboard />} /> {/* <-- ADAUGĂ RUTA ASTA */}
                <Route path="add-stock" element={<AddStock />} />
                <Route path="inventory" element={<CurrentInventory />} />
                <Route path="*" element={<div className="p-10 text-center text-gray-500 font-bold">Page not found. Error 404</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </InventoryProvider>
    </ThemeProvider>
  );
}

export default App;