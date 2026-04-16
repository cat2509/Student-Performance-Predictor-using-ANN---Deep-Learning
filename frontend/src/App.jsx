import React, { useState } from 'react';
import axios from 'axios';
import { BrainCircuit } from 'lucide-react';
import PredictorForm from './components/PredictorForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8001/predict/', formData);
      setResult(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.response?.data?.error || "Error connecting to prediction sever. Is Django running?");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
            <BrainCircuit className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Student Performance Predictor
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Harness the power of our Neural Network to forecast academic success based on study habits and lifestyle.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className={`transition-all duration-500 ease-in-out ${result ? 'md:col-span-7' : 'md:col-span-8 md:col-start-3'}`}>
            <PredictorForm onPredict={handlePredict} loading={loading} />
          </div>
          
          {result && (
            <div className="md:col-span-5 animate-in fade-in slide-in-from-right-8 duration-500">
             <ResultCard result={result} onReset={handleReset} />
            </div>
          )}
        </div>
        
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
