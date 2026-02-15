import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/public/Hero';
import HowItWorks from '../../components/public/HowItWorks';
import StatsSection from '../../components/public/StatsSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <StatsSection />
      </main>
    </div>
  );
};

export default LandingPage;