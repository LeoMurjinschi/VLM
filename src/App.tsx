import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importăm librăria pentru Notificări
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 2. Contextul pentru Temă
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';

// 3. Componentele de Layout
import Sidebar from './components/Sidebar'; 
import Header from './components/Header';

// 4. Paginile tale
import Dashboard from './pages/Dashboard';
import MyPickups from './pages/MyPickUps';
import ReservationHistory from './pages/ReservationHistory';
import FeedbackRating from './pages/FeedbackRating';
import SafetyGuide from './pages/SafetyGuide';
import ProfileSettings from './pages/ProfileSettings';
import NotificationHistory from './pages/NotificationHistory';
import Messages from './pages/Messages';

// === COMPONENTĂ NOUĂ PENTRU NOTIFICĂRI PREMIUM ===

const ThemedToastContainer = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true} 
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // Am combinat clasele aici și am șters bodyClassName
      toastClassName={`relative flex p-4 mb-4 rounded-2xl justify-between items-center overflow-hidden cursor-pointer border shadow-2xl transition-all text-sm font-bold gap-2 ${
        theme === 'light' 
          ? 'bg-white text-gray-800 border-gray-100' 
          : 'bg-gray-800 text-gray-100 border-gray-700'
      }`}
    />
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-white-900 transition-colors duration-300">
          
          {/* === 1. SIDEBAR DESKTOP === */}
          <aside className="hidden md:flex flex-col h-screen w-56 z-20">
            <Sidebar />
          </aside>

          {/* === 2. OVERLAY MOBIL === */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
              onClick={toggleSidebar}
            />
          )}
          
          {/* === 3. SIDEBAR MOBIL === */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-56 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar onClose={toggleSidebar} />
          </aside>

          {/* === 4. ZONA DE CONȚINUT (DREAPTA) === */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-transparent">
            
            <Header onMenuClick={toggleSidebar} />

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 bg-transparent">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<ReservationHistory />} />
                <Route path="/feedback" element={<FeedbackRating />} />
                <Route path="/safety" element={<SafetyGuide />} />
                <Route path="/pickups" element={<MyPickups />} />
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/notifications" element={<NotificationHistory />} />
                <Route path="/messages" element={<Messages />}/>
                
                {/* Ruta Fallback (404) */}
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl font-black">?</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100">Page under construction</h2>
                    <p className="text-gray-500 dark:text-gray-400">We are currently working on this feature.</p>
                  </div>
                } />
              </Routes>
            </main>

          </div>
        </div>

        {/* Folosim noua componentă ThemedToastContainer în interiorul Router-ului */}
        <ThemedToastContainer />

      </Router>
    </ThemeProvider>
  );
}

export default App;