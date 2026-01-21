import { useState } from 'react';
import Header from './components/common/Header';
import Weather from './pages/Weather';
import CropCalendar from './pages/Crops';
import MarketPrices from './pages/Markets';
import Diseases from './pages/Diseases';
import Home from './pages/Home';
import Footer from './components/common/Footer';

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header onNavigate={setActivePage} activePage={activePage} />
      
      <main>
        {activePage === 'home' && <Home />}
        {activePage === 'weather' && <Weather />}
        {activePage === 'crops' && <CropCalendar />}
        {activePage === 'markets' && <MarketPrices />}
        {activePage === 'diseases' && <Diseases />}
      </main>
      <Footer />
    </div>
  );
}

export default App;