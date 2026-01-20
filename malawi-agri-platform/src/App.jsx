import { useState } from 'react';
import Header from './components/common/Header';
import Home from './pages/Home';

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header onNavigate={setActivePage} activePage={activePage} />
      
      <main>
        {activePage === 'home' && <Home />}
        {activePage === 'weather' && <div className="container mx-auto px-4 py-8"><h2 className="text-3xl font-bold">Weather Page - Coming Soon</h2></div>}
        {activePage === 'crops' && <div className="container mx-auto px-4 py-8"><h2 className="text-3xl font-bold">Crops Page - Coming Soon</h2></div>}
        {activePage === 'markets' && <div className="container mx-auto px-4 py-8"><h2 className="text-3xl font-bold">Markets Page - Coming Soon</h2></div>}
        {activePage === 'diseases' && <div className="container mx-auto px-4 py-8"><h2 className="text-3xl font-bold">Diseases Page - Coming Soon</h2></div>}
      </main>
    </div>
  );
}

export default App;