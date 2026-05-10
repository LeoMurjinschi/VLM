import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/public/Hero';
import HowItWorks from '../../components/public/HowItWorks';
import StatsSection from '../../components/public/StatsSection';
import CtaSection from '../../components/public/CtaSection';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../hooks/useTheme';

const LandingPage = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#1a1a1a] text-gray-100'
    }`}>
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <StatsSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;