import { useState, useEffect } from 'react';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';
import PriceTable from '../components/market/PriceTable';
import PriceComparison from '../components/market/PriceComparison';

function Markets() {
  const [marketData, setMarketData] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('Maize');

  // Load market data
  useEffect(() => {
    fetch('/data/markets.json')
      .then(res => res.json())
      .then(data => setMarketData(data))
      .catch(err => console.error('Error loading markets:', err));
  }, []);

  if (!marketData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading market prices...</p>
      </div>
    );
  }

  const crops = ['Maize', 'Groundnuts', 'Beans', 'Rice', 'Cassava', 'Sweet Potato'];
  const displayedMarkets = selectedMarket === 'all' 
    ? marketData.markets 
    : marketData.markets.filter(m => m.id === selectedMarket);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Market Prices
        </h1>
        <p className="text-gray-600">
          Current agricultural commodity prices across Malawi
        </p>
      </div>

      {/* Last Updated Banner */}
      <div className="mb-6 bg-green-50 border-l-4 border-green-600 p-4 rounded flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-700">
            <strong>Last Updated:</strong> {new Date(marketData.lastUpdated).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-700">
          <TrendingUp className="w-4 h-4" />
          <span>Prices updated daily</span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        {/* Market Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Select Market
          </label>
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Markets</option>
            {marketData.markets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name} - {market.city}
              </option>
            ))}
          </select>
        </div>

        {/* Crop Selector for Comparison */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compare Crop Prices
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Comparison Chart */}
      {selectedMarket === 'all' && (
        <div className="mb-8">
          <PriceComparison markets={marketData.markets} selectedCrop={selectedCrop} />
        </div>
      )}

      {/* Price Tables */}
      <div className="space-y-6">
        {displayedMarkets.map((market) => (
          <PriceTable key={market.id} market={market} />
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">📊 How to Use Market Prices</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Compare prices across different markets to find the best selling opportunity</li>
          <li>• Green arrows (↑) indicate price increases, red arrows (↓) indicate decreases</li>
          <li>• Prices are updated daily based on market surveys</li>
          <li>• Transport costs should be considered when comparing distant markets</li>
        </ul>
      </div>
    </div>
  );
}

export default Markets;