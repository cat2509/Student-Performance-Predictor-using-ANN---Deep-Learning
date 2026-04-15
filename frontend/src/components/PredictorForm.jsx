import React, { useState } from 'react';
import { BookOpen, Clock, Activity, FileText, ChevronRight, Loader2 } from 'lucide-react';

const PredictorForm = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState({
    hours_studied: '',
    previous_scores: '',
    sleep_hours: '',
    extracurricular_activities: '0',
    practice_papers: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({
      hours_studied: Number(formData.hours_studied),
      previous_scores: Number(formData.previous_scores),
      sleep_hours: Number(formData.sleep_hours),
      extracurricular_activities: Number(formData.extracurricular_activities),
      practice_papers: Number(formData.practice_papers)
    });
  };

  const inputClasses = "mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-white/50 backdrop-blur-sm border transition-all hover:bg-white focus:bg-white";

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        Student Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Hours Studied (Daily)
            </label>
            <input
              type="number"
              name="hours_studied"
              min="0"
              max="24"
              required
              placeholder="e.g. 5"
              value={formData.hours_studied}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
              Previous Score (%)
            </label>
            <input
              type="number"
              name="previous_scores"
              min="0"
              max="100"
              required
              placeholder="e.g. 85"
              value={formData.previous_scores}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Clock className="w-4 h-4 mr-2 text-purple-500" />
              Sleep Hours (Daily)
            </label>
            <input
              type="number"
              name="sleep_hours"
              min="0"
              max="24"
              required
              placeholder="e.g. 8"
              value={formData.sleep_hours}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Practice Papers Done
            </label>
            <input
              type="number"
              name="practice_papers"
              min="0"
              max="100"
              required
              placeholder="e.g. 10"
              value={formData.practice_papers}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <Activity className="w-4 h-4 mr-2 text-green-500" />
            Extracurricular Activities
          </label>
          <select
            name="extracurricular_activities"
            value={formData.extracurricular_activities}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="1">Yes, I participate</option>
            <option value="0">No, I do not</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Analyzing Data...
              </>
            ) : (
              <>
                Run Prediction Model
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictorForm;
