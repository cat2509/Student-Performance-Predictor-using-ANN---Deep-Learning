import React, { useEffect, useState } from 'react';
import { Target, RotateCcw } from 'lucide-react';

const ResultCard = ({ result, onReset }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const score = result.predicted_score;
  const label = result.performance;

  useEffect(() => {
    let current = 0;
    const step = score / 30; // 30 frames
    const timer = setInterval(() => {
      current += step;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const getColorScheme = () => {
    switch (label) {
      case 'Poor':
        return { text: 'text-red-600', bg: 'bg-red-500', lightBg: 'bg-red-50', border: 'border-red-200' };
      case 'Average':
        return { text: 'text-yellow-600', bg: 'bg-yellow-500', lightBg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'Good':
        return { text: 'text-blue-600', bg: 'bg-blue-500', lightBg: 'bg-blue-50', border: 'border-blue-200' };
      case 'Excellent':
        return { text: 'text-green-600', bg: 'bg-green-500', lightBg: 'bg-green-50', border: 'border-green-200' };
      default:
        return { text: 'text-gray-600', bg: 'bg-gray-500', lightBg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const scheme = getColorScheme();

  return (
    <div className={`rounded-3xl p-8 border ${scheme.border} ${scheme.lightBg} shadow-xl transform transition-all h-full flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Target className="w-6 h-6 mr-2 text-gray-700" />
            Prediction Result
          </h3>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-white shadow-sm ${scheme.text} border ${scheme.border}`}>
            {label}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
                r="80"
                cx="96"
                cy="96"
              />
              <circle
                className={scheme.text}
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - animatedScore / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="80"
                cx="96"
                cy="96"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className={`text-5xl font-extrabold ${scheme.text}`}>
                {Math.round(animatedScore)}
              </span>
              <span className="text-gray-500 text-sm block mt-1">out of 100</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-8 w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Prediction
      </button>
    </div>
  );
};

export default ResultCard;
