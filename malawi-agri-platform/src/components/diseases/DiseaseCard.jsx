import { AlertCircle, Leaf, ChevronRight } from 'lucide-react';

function DiseaseCard({ disease, onSelect }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return {
          badge: 'bg-red-100 text-red-700 border-red-200',
          bar: 'bg-red-500',
          icon: 'text-red-500'
        };
      case 'Medium':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          bar: 'bg-amber-500',
          icon: 'text-amber-500'
        };
      case 'Low':
        return {
          badge: 'bg-green-100 text-green-700 border-green-200',
          bar: 'bg-green-500',
          icon: 'text-green-500'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          bar: 'bg-gray-500',
          icon: 'text-gray-500'
        };
    }
  };

  const colors = getSeverityColor(disease.severity);

  return (
    <div
      onClick={() => onSelect(disease)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-500 overflow-hidden group"
    >
      {/* Severity Bar at Top */}
      <div className={`w-full h-3 ${colors.bar}`}></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {disease.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{disease.nameChichewa}</p>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className={`w-6 h-6 ${colors.icon}`} />
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Severity Badge */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Severity Level</p>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${colors.badge}`}>
              {disease.severity}
            </span>
          </div>

          {/* Affected Crops */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Affects</p>
            <div className="flex items-center flex-wrap gap-2">
              <Leaf className="w-4 h-4 text-primary-600 flex-shrink-0" />
              {disease.crops.map((crop, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Key Symptom */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Key Symptom</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {disease.symptoms[0]}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg group-hover:scale-105">
          View Full Details
        </button>
      </div>
    </div>
  );
}

export default DiseaseCard;