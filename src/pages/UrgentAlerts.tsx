import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import AlertItem from '../components/AlertItem';
import AlertDetail from '../components/AlertDetail';
import { MOCK_ALERTS, type Alert } from './../_mock/alerts';

const UrgentAlerts: React.FC = () => {
  const { theme } = useTheme();
  
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  // Găsim alerta selectată curent
  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || null;

  const handleMarkAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  return (
    <PageLayout>
      {/* Wrapper-ul paginii cu min-h-screen pentru a nu forța calcule dubioase */}
      <div className={`max-w-7xl mx-auto min-h-screen pb-10 flex flex-col w-full ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* Header-ul cu titlul */}
        <div className="mb-4 shrink-0">
          <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            Urgent Alerts
          </h1>
        </div>

        {/* Containerul principal Split-Pane - BLOCAT la înălțimea fixă de 600px */}
        <div className={`w-full h-[600px] flex overflow-hidden rounded-2xl border shadow-sm ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          
          {/* Panoul din Stânga (Lista de Alerte) */}
          <div className={`w-full md:w-1/3 shrink-0 flex flex-col h-full border-r ${
            theme === 'light' ? 'border-gray-200' : 'border-gray-700'
          } ${selectedAlertId ? 'hidden md:flex' : 'flex'}`}>
            
            <div className={`p-4 border-b shrink-0 font-bold ${theme === 'light' ? 'border-gray-100 text-gray-900' : 'border-gray-700 text-gray-100'}`}>
              Inbox ({alerts.filter(a => !a.isRead).length} unread)
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {alerts.map(alert => (
                <AlertItem 
                  key={alert.id}
                  alert={alert}
                  isSelected={selectedAlertId === alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                />
              ))}
            </div>
          </div>

          {/* Panoul din Dreapta (Detaliile Alertei) */}
          <div className={`w-full md:w-2/3 flex-1 min-w-0 flex flex-col h-full ${
            !selectedAlertId ? 'hidden md:flex' : 'flex'
          }`}>
            <AlertDetail 
              alert={selectedAlert} 
              onBack={() => setSelectedAlertId(null)}
              onMarkAsRead={handleMarkAsRead}
            />
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default UrgentAlerts;