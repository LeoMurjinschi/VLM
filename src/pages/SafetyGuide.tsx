import React, { useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import AccordionItem from '../components/AccordionItem';
import { toast } from 'react-toastify';
// 1. Importăm motion de la framer-motion
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  FireIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  TruckIcon,
  ShoppingBagIcon,
  EyeIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const SafetyGuide: React.FC = () => {
  const { theme } = useTheme();
  const [openSection, setOpenSection] = useState<number | null>(0);
  
  // State pentru consimțământ finalizat
  const [hasConsented, setHasConsented] = useState(false);

  // 2. Logica pentru Swipe (Framer Motion)
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  // Transformăm poziția X într-o valoare de opacitate pentru textul din spate (dispare pe măsură ce tragi)
  const opacity = useTransform(x, [0, 200], [1, 0]);
  // Schimbăm culoarea fundalului butonașului când ajunge la final
  const color = useTransform(x, [0, 220], ["#3b82f6", "#10b981"]); // Blue to Emerald

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Funcția care se apelează când glisarea e completă
  const handleDragEnd = (_: any, info: any) => {
    // Dacă utilizatorul a tras destul de mult (peste 220px)
    if (info.point.x > 220 || info.offset.x > 220) {
      setHasConsented(true);
      toast.success('Commitment recorded! You are a Food Safety Hero! 🦸‍♂️');
    } else {
      // Dacă nu a tras destul, butonașul sare înapoi la start (automat prin Framer Motion)
    }
  };

  // Datele pentru secțiunile acordeonului rămân la fel
  const guideSections = [
    { title: 'Faza 1: Before Pickup (Preparation)', icon: <SparklesIcon className="w-6 h-6" />, content: (<ul className="space-y-3 list-disc list-inside marker:text-blue-500"><li><strong>Clean Equipment:</strong> Thermal bags must be clean.</li><li><strong>No Pets:</strong> Keep animals separate.</li></ul>) },
    { title: 'Faza 2: At the Donor (Inspection)', icon: <EyeIcon className="w-6 h-6" />, content: (<ul className="space-y-3 list-disc list-inside marker:text-blue-500"><li><strong>Visual Check:</strong> Inspect packaging. Refuse leaky containers.</li><li><strong>Ask Questions:</strong> Identify allergens.</li></ul>) },
    { title: 'Faza 3: Transportation (Handling)', icon: <TruckIcon className="w-6 h-6" />, content: (<ul className="space-y-3 list-disc list-inside marker:text-blue-500"><li><strong>Separate Items:</strong> Hot food away from cold food.</li><li><strong>Direct Route:</strong> Proceed directly to NGO center.</li></ul>) },
    { title: 'Faza 4: Distribution & Serving', icon: <ShoppingBagIcon className="w-6 h-6" />, content: (<ul className="space-y-3 list-disc list-inside marker:text-blue-500"><li><strong>Reheating Rule:</strong> Reach 75°C.</li><li><strong>No Re-freezing:</strong> Discard unconsumed reheated food.</li></ul>) }
  ];

  return (
    <PageLayout>
      <div className={`w-full max-w-4xl mx-auto min-h-screen pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheckIcon className="w-10 h-10 text-emerald-500" />
            <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Food Safety Guide
            </h1>
          </div>
          <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Read carefully and commit to the safety standards.
          </p>
        </div>

        {/* Golden Rules (Grid compact) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
            <FireIcon className="w-7 h-7 text-red-500 mb-2" />
            <h3 className={`font-bold text-base ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Hot & Cold</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Keep hot {`>`} 60°C, cold {`<`} 4°C.</p>
          </div>
          <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
            <ClockIcon className="w-7 h-7 text-orange-500 mb-2" />
            <h3 className={`font-bold text-base ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>2h Window</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Transport & serve within 2 hours.</p>
          </div>
          <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
            <ExclamationTriangleIcon className="w-7 h-7 text-blue-500 mb-2" />
            <h3 className={`font-bold text-base ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Allergens</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask donor about major allergens.</p>
          </div>
        </div>

        {/* Acordeon procedures */}
        <div className="mb-10">
          {guideSections.map((section, index) => (
            <AccordionItem key={index} title={section.title} icon={section.icon} content={section.content} isOpen={openSection === index} onClick={() => toggleSection(index)} />
          ))}
        </div>

        {/* --- NOUA SECȚIUNE DE CONSIMȚĂMÂNT INTERACTIV (Swipe to Agree) --- */}
        <div className={`p-6 md:p-8 rounded-3xl mb-10 border shadow-inner transition-colors ${
          theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
        }`}>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className={`p-3 rounded-full shrink-0 ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
              <ShieldCheckIcon className="w-9 h-9" />
            </div>
            <div>
              <h4 className={`text-xl font-extrabold mb-1.5 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                Digital Safety Commitment
              </h4>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                By glising the button below, I confirm that I have read the guide and commit to following these procedures to ensure food safety during transport and distribution.
              </p>
            </div>
          </div>

          {/* Zona de glisare (Slider-ul) */}
          {!hasConsented ? (
            <div className="w-full flex justify-center mt-6">
              <div 
                ref={constraintsRef} // Limitele de glisare
                className={`relative w-full max-w-md h-16 rounded-full p-1.5 flex items-center overflow-hidden shadow-inner ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
                }`}
              >
                {/* Textul din fundal care dispare (motion.div) */}
                <motion.div 
                  style={{ opacity }}
                  className="absolute inset-0 flex items-center justify-center font-bold text-sm tracking-wide text-gray-400 select-none"
                >
                  Swipe right to Agree
                </motion.div>

                {/* Butonașul pe care îl tragi (motion.div interactiv) */}
                <motion.div
                  drag="x" 
                  dragConstraints={constraintsRef} 
                  dragElastic={0.05} 
                  dragMomentum={false} 
                  onDragEnd={handleDragEnd} 
                  
                  style={{ x, backgroundColor: color }} 
                  className="relative z-10 w-14 h-13 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
                >
                  <ChevronRightIcon className="w-7 h-7 text-white" />
                  <ChevronRightIcon className="w-7 h-7 text-white/50 -ml-4" />
                </motion.div>
              </div>
            </div>
          ) : (
            /* State-ul de SUCCES (Arată superb) */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left border-2 border-emerald-500 ${
                theme === 'light' ? 'bg-emerald-50' : 'bg-emerald-900/20'
              }`}
            >
              <CheckCircleIcon className="w-16 h-16 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Agreement Officially Logged</h4>
                <p className="text-sm text-emerald-600 dark:text-emerald-300">
                  Thank you, volunteer! Your commitment to food safety has been securely recorded on your profile. You're ready to rescue food safely.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Report Hazard Section (Rămâne la fel, e bine demarcată) */}
        <div className={`p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-red-200 ${
          theme === 'light' ? 'bg-red-50' : 'bg-red-900/20 border-red-900/50'
        }`}>
          <div>
            <h3 className={`text-xl font-extrabold mb-2 ${theme === 'light' ? 'text-red-900' : 'text-red-400'}`}>
              Spotted a Safety Hazard?
            </h3>
            <p className={`text-sm ${theme === 'light' ? 'text-red-700' : 'text-red-300'}`}>
              Report severe hygiene issues immediately. Your safety is our priority.
            </p>
          </div>
          <button className="shrink-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98]">
            Report Issue
          </button>
        </div>

      </div>
    </PageLayout>
  );
};

export default SafetyGuide;