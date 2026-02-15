import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/public/Hero';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
};

export default LandingPage;