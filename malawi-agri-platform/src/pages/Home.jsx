import { Cloud, Calendar, DollarSign, AlertCircle } from 'lucide-react';

function Home({ onNavigate }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] "></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌾 Empowering Malawian Farmers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Smart Agriculture for Your Farm
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Get real-time weather updates, market prices, crop guidance, and disease alerts all in one place. Make informed decisions for better harvests.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('weather')}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Get Started
              </button>
              <button 
                onClick={() => onNavigate('crops')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive agricultural tools designed specifically for Malawian farmers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cloud, title: 'Weather Forecasts', desc: '7-day forecasts for all regions', color: 'bg-blue-500', page: 'weather' },
              { icon: Calendar, title: 'Crop Calendar', desc: 'Planting & harvest schedules', color: 'bg-green-500', page: 'crops' },
              { icon: DollarSign, title: 'Market Prices', desc: 'Real-time price updates', color: 'bg-amber-500', page: 'markets' },
              { icon: AlertCircle, title: 'Disease Alerts', desc: 'Identify and treat crop diseases', color: 'bg-red-500', page: 'diseases' },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate(feature.page)}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Active Farmers' },
              { number: '12', label: 'Crop Types' },
              { number: '26', label: 'Districts Covered' },
              { number: '98%', label: 'Accuracy Rate' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;