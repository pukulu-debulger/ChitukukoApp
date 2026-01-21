import { X, Calendar, Sprout, Bug, Lightbulb } from 'lucide-react';

function CropDetail({ crop, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary-600 text-white p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold">{crop.name}</h2>
              <p className="text-primary-100 text-lg">{crop.nameChichewa}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-700 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Planting Schedule */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Planting Schedule
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Planting Time</p>
                <p className="text-lg font-semibold text-green-700">
                  {crop.plantingMonths.join(', ')}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Harvest Time</p>
                <p className="text-lg font-semibold text-amber-700">
                  {crop.harvestMonths.join(', ')}
                </p>
              </div>
            </div>
          </section>

          {/* Growing Conditions */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Sprout className="w-5 h-5 mr-2 text-primary-600" />
              Growing Conditions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Soil Type</p>
                <p className="text-gray-900">{crop.soilType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rainfall</p>
                <p className="text-gray-900">{crop.rainfall}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Temperature</p>
                <p className="text-gray-900">{crop.temperature}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Spacing</p>
                <p className="text-gray-900">{crop.spacing}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Fertilizer</p>
                <p className="text-gray-900">{crop.fertilizer}</p>
              </div>
            </div>
          </section>

          {/* Common Pests */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Bug className="w-5 h-5 mr-2 text-primary-600" />
              Common Pests & Diseases
            </h3>
            <div className="flex flex-wrap gap-2">
              {crop.pests.map((pest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                >
                  {pest}
                </span>
              ))}
            </div>
          </section>

          {/* Farming Tips */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Lightbulb className="w-5 h-5 mr-2 text-primary-600" />
              Farming Tips
            </h3>
            <ul className="space-y-2">
              {crop.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CropDetail;