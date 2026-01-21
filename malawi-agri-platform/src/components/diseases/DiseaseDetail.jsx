import { X, AlertTriangle, Stethoscope, Shield, Bug } from 'lucide-react';

function DiseaseDetail({ disease, onClose }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Low':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        {/* Header */}
        <div className={`${getSeverityColor(disease.severity)} text-white p-6 rounded-t-lg`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">{disease.name}</h2>
              <p className="text-lg opacity-90">{disease.nameChichewa}</p>
              <div className="mt-3 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">{disease.severity} Severity</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Affected Crops */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Bug className="w-5 h-5 mr-2 text-primary-600" />
              Affected Crops
            </h3>
            <div className="flex flex-wrap gap-2">
              {disease.crops.map((crop, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-100 text-primary-800 rounded-lg font-medium"
                >
                  {crop}
                </span>
              ))}
            </div>
          </section>

          {/* Causes */}
          <section className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">What Causes It?</h3>
            <p className="text-gray-700">{disease.causes}</p>
          </section>

          {/* Symptoms */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Symptoms to Look For
            </h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start bg-red-50 rounded-lg p-3">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Treatment */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
              Treatment Methods
            </h3>
            <ul className="space-y-2">
              {disease.treatment.map((method, index) => (
                <li key={index} className="flex items-start bg-blue-50 rounded-lg p-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{method}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prevention */}
          <section>
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Prevention Strategies
            </h3>
            <ul className="space-y-2">
              {disease.prevention.map((strategy, index) => (
                <li key={index} className="flex items-start bg-green-50 rounded-lg p-3">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Warning Box */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800">Important Note</p>
                <p className="text-sm text-yellow-700 mt-1">
                  If you're unsure about the disease or treatment, consult your local agricultural extension officer. 
                  Always follow pesticide label instructions and safety precautions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetail;