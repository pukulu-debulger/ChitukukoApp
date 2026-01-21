import { Calendar, Droplets, Thermometer, ChevronRight } from 'lucide-react';

function CropCard({ crop, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(crop)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-500 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{crop.name}</h3>
          <p className="text-sm text-gray-500">{crop.nameChichewa}</p>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-primary-600" />
          <span className="text-gray-600">
            <strong>Plant:</strong> {crop.plantingMonths.join(', ')}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-green-600" />
          <span className="text-gray-600">
            <strong>Harvest:</strong> {crop.harvestMonths.join(', ')}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Droplets className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600">
            <strong>Rainfall:</strong> {crop.rainfall}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Thermometer className="w-4 h-4 text-red-600" />
          <span className="text-gray-600">
            <strong>Temp:</strong> {crop.temperature}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-primary-600 font-medium">
          Click to view full details →
        </p>
      </div>
    </div>
  );
}

export default CropCard;