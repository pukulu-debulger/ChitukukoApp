import { Cloud, TrendingUp, Calendar, Bug, ArrowRight, Users, MapPin, CheckCircle, Smartphone } from 'lucide-react';

function Home({ onNavigate }) {
  const features = [
    {
      icon: Cloud,
      title: 'Weather Forecasts',
      description: 'Get real-time weather updates for all Malawian regions to plan your farming activities.',
      color: 'from-blue-500 to-blue-600',
      page: 'weather'
    },
    {
      icon: Calendar,
      title: 'Crop Calendars',
      description: 'Know exactly when to plant and harvest with our seasonal guides for 12+ crops.',
      color: 'from-green-500 to-green-600',
      page: 'crops'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Access current market prices from major trading centers to get the best deals.',
      color: 'from-amber-500 to-amber-600',
      page: 'markets'
    },
    {
      icon: Bug,
      title: 'Disease Detection',
      description: 'Identify crop diseases quickly and get treatment recommendations.',
      color: 'from-red-500 to-red-600',
      page: 'diseases'
    }
  ];

  const stats = [
    { number: '6+', label: 'Common Diseases', icon: Bug },
    { number: '12+', label: 'Crop Guides', icon: Calendar },
    { number: '28', label: 'Districts Covered', icon: MapPin },
    { number: '1000+', label: 'Farmers Helped', icon: Users }
  ];

  const benefits = [
    'Free access to all farming information',
    'Works on low-bandwidth networks (2G/3G)',
    'Available in English and Chichewa',
    'Updated daily with fresh data',
    'Designed specifically for Malawian farmers',
    'No registration required to get started'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-green-600 to-primary-700 text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-20 rounded-full px-6 py-2 mb-6">
              <p className="text-sm font-semibold">🇲🇼 Built for Malawian Farmers</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Chitukuko
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-green-100">
              Your Agricultural Advisory Platform
            </p>
            
            <p className="text-lg mb-8 text-white text-opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get weather forecasts, crop calendars, market prices, and disease alerts - 
              all in one place to help you grow better crops and improve your livelihood! 🌾
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('weather')}
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Cloud className="w-6 h-6" />
                <span>Check Weather</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => onNavigate('crops')}
                className="bg-primary-800 bg-opacity-50 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-70 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-6 h-6" />
                <span>View Crop Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access essential farming information designed specifically for Malawian agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  onClick={() => onNavigate(feature.page)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 h-full border-2 border-transparent hover:border-primary-500 hover:scale-105">
                    <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-50 to-green-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Chitukuko?
              </h2>
              <p className="text-xl text-gray-600">
                Built with Malawian farmers in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Tool</h3>
              <p className="text-gray-600">
                Select from Weather, Crops, Markets, or Disease Detection based on your needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select Your Location</h3>
              <p className="text-gray-600">
                Pick your region or district to get personalized, relevant information
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Take Action</h3>
              <p className="text-gray-600">
                Use the insights to make better farming decisions and improve your yields
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <Smartphone className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Improve Your Farming?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of Malawian farmers using Chitukuko to make smarter farming decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('weather')}
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => onNavigate('crops')}
              className="bg-primary-800 bg-opacity-50 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-70 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;