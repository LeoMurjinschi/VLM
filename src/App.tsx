import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import DonationFeed from './pages/DonationFeed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<DashboardLayout />}>
          
          <Route index element={<Navigate to="/feed" replace />} />
          
          
          <Route path="feed" element={<DonationFeed />} />
          
          
          <Route path="*" element={<div className="p-10 text-center text-gray-500">Page under construction 🚧</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;