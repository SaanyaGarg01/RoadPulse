
import Navbar from './components/Navbar';
import StatsTicker from './components/StatsTicker';
import HeroSection from './components/HeroSection';
import MapSection from './components/MapSection';
import FeatureCards from './components/FeatureCards';
import ChaosPredictor from './components/ChaosPredictor';
import Leaderboard from './components/Leaderboard';
import HowItWorks from './components/HowItWorks';
import CitizenReports from './components/CitizenReports';
import ImpactNumbers from './components/ImpactNumbers';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <StatsTicker />
      <Navbar />
      <HeroSection />
      <MapSection />
      <FeatureCards />
      <ChaosPredictor />
      <Leaderboard />
      <HowItWorks />
      <CitizenReports />
      <ImpactNumbers />
      <Footer />
    </div>
  );
}

export default App;
