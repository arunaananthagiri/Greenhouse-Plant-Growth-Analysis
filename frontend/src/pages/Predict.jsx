import { useState } from 'react';
import axios from 'axios';

const featureLabels = [
  'Average chlorophyll content (photosynthetic pigment)',
  'Plant height growth rate',
  'Average wet weight of vegetative growth',
  'Average leaf area per plant',
  'Average number of leaves per plant',
  'Average root diameter',
  'Average dry weight of roots',
  '% dry matter in vegetative growth',
  'Average root length',
  'Average wet weight of roots',
  'Average dry weight of vegetative parts',
  '% dry matter in root growth'
];

export default function Predict() {
  const [inputs, setInputs] = useState(Array(featureLabels.length).fill(''));
  const [prediction, setPrediction] = useState(null);
  const [groupType, setGroupType] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleSubmit = async () => {
    setError(null);
    setPrediction(null);
    setGroupType(null);
    setLoading(true);

    const numericInputs = inputs.map(parseFloat);
    if (numericInputs.some(isNaN)) {
      setError("Please enter valid numeric values for all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5678/predict', {
        features: numericInputs,
      });

      const predictedClass = res.data.prediction;
      setPrediction(predictedClass);

      if (['SA', 'SB', 'SC'].includes(predictedClass)) {
        setGroupType("Traditional Greenhouse");
      } else if (['TA', 'TB', 'TC'].includes(predictedClass)) {
        setGroupType("IoT-based Greenhouse");
      } else {
        setGroupType("Unknown Group Type");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Plant Growth Predictor</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureLabels.map((label, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="number"
                step="0.0001"
                value={inputs[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter value"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 w-full py-3 px-6 text-white rounded-md ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Processing...' : 'Predict Growth Class'}
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h2 className="text-xl font-semibold text-green-800">Results</h2>
            <p className="mt-2">
              <span className="font-medium">Predicted Class:</span>{' '}
              <span className="text-green-700">{prediction}</span>
            </p>
            <p className="mt-1">
              <span className="font-medium">Greenhouse Type:</span>{' '}
              <span className="text-green-700">{groupType}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}