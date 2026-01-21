import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import CropCard from '../components/crops/CropCard';
import CropDetail from '../components/crops/CropDetail';

function Crops() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load crops data
  useEffect(() => {
    fetch('/data/crops.json')
      .then(res => res.json())
      .then(data => {
        setCrops(data.crops);
      })
      .catch(err => console.error('Error loading crops:', err));
  }, []);

  // Filter crops based on search - using useMemo instead of useEffect
  const filteredCrops = useMemo(() => {
    if (!searchTerm) {
      return crops;
    }
    return crops.filter(crop =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.nameChichewa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, crops]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Crop Calendar
        </h1>
        <p className="text-gray-600">
          Planting and harvesting guides for common Malawian crops
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search crops (e.g., Maize, Chimanga)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Current Month Info */}
      <div className="mb-6 bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>Current Month:</strong> {new Date().toLocaleString('default', { month: 'long' })}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Check which crops you should be planting or harvesting now
        </p>
      </div>

      {/* Crops Grid */}
      {filteredCrops.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onSelect={setSelectedCrop}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No crops found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Crop Detail Modal */}
      {selectedCrop && (
        <CropDetail
          crop={selectedCrop}
          onClose={() => setSelectedCrop(null)}
        />
      )}
    </div>
  );
}

export default Crops;