import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, AlertCircle, Upload, Camera } from 'lucide-react';
import DiseaseCard from '../components/diseases/DiseaseCard';
import DiseaseDetail from '../components/diseases/DiseaseDetail';

function Diseases() {
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Load diseases data
  useEffect(() => {
    fetch('/data/diseases.json')
      .then(res => res.json())
      .then(data => setDiseases(data.diseases))
      .catch(err => console.error('Error loading diseases:', err));
  }, []);

  // Get unique crops for filter
  const crops = useMemo(() => {
    const allCrops = diseases.flatMap(d => d.crops);
    return ['all', ...new Set(allCrops)];
  }, [diseases]);

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch = searchTerm === '' || 
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.nameChichewa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCrop = filterCrop === 'all' || disease.crops.includes(filterCrop);
      const matchesSeverity = filterSeverity === 'all' || disease.severity === filterSeverity;

      return matchesSearch && matchesCrop && matchesSeverity;
    });
  }, [diseases, searchTerm, filterCrop, filterSeverity]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient background */}
      {/* Header with gradient background */}
<div className="mb-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
  <h1 className="text-4xl font-bold mb-2">
    Crop Disease Detection
  </h1>
  <p className="text-red-100 text-lg">
    Identify, treat, and prevent diseases affecting your crops
  </p>
</div>

    

      {/* Search and Filters Section */}
      <div className="mb-8 bg-white rounded-xl shadow-md p-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search diseases or crops (e.g., Maize, Fall Armyworm)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Crop Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Filter by Crop
            </label>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop === 'all' ? 'All Crops' : crop}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Filter by Severity
            </label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="all">All Severities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <strong className="text-primary-600">{filteredDiseases.length}</strong> of <strong>{diseases.length}</strong> diseases
          </p>
        </div>
      </div>

      {/* Diseases Grid */}
      {filteredDiseases.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDiseases.map((disease) => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              onSelect={setSelectedDisease}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl mb-8">
          <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-4">No diseases found matching your filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterCrop('all');
              setFilterSeverity('all');
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}

       {/* Photo Upload Feature Banner */}
      <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-4 shadow-lg">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Need Help Identifying a Disease?
            </h3>
            <p className="text-gray-700 mb-3">
              Upload a photo of your affected crop and our AI system will help identify the disease and recommend treatment.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Upload Photo (Coming Soon)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expert Help Section */}
      <div className="bg-gradient-to-br from-primary-50 to-green-50 border-2 border-primary-200 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-gradient-to-br from-primary-600 to-green-600 rounded-xl p-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need Expert Assistance?
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you're unable to identify the disease or need professional assistance, contact your local agricultural extension officer. They can provide:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Accurate disease diagnosis</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Customized treatment recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Prevention strategies for your specific area</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Access to government agricultural programs</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 bg-white bg-opacity-60 rounded-lg p-3 border-l-4 border-primary-600">
              <strong>Disclaimer:</strong> This tool provides general information for educational purposes. 
              Always consult agricultural experts for accurate diagnosis and treatment recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <DiseaseDetail
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
        />
      )}
    </div>
  );
}

export default Diseases;