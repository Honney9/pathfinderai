// CareerPathwayAdvisor.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useProfileSubmission } from '../hooks/useProfile';
import RecommendationDisplay from './RecommendationDIsplay';

const CareerPathwayAdvisor = () => {
  // Initialize formData with default values to prevent undefined errors
  const [formData, setFormData] = useState({
    currentRole: '',
    experienceLevel: '',
    educationLevel: '',
    location: '',
    currentSalary: '',
    targetSalary: '',
    timeCommitment: '',
    skills: [],
    interests: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const { recommendations, loading, error, submitProfile } = useProfileSubmission();
  console.log('AI response from useProfile hook:', recommendations);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await submitProfile(formData);
      console.log("submitProfile called"); // ✅ Add this
      console.log('Recommendations received:', result);
      handleNext(); // Move to recommendations step
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };
  
  // Step 1: Profile Form
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
      
          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">Help us understand your background and goals</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  placeholder="e.g., Marketing Coordinator"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="entry">Entry Level (0-1 years)</option>
                  <option value="junior">Junior (2-3 years)</option>
                  <option value="mid">Mid Level (4-6 years)</option>
                  <option value="senior">Senior (7+ years)</option>
                  <option value="executive">Executive (10+ years)</option>
                </select>
              </div>

              {/* Education Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select education</option>
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., New York, NY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Salary Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Salary ($)
                  </label>
                  <input
                    type="number"
                    value={formData.currentSalary}
                    onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                    placeholder="e.g., 65000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Salary ($)
                  </label>
                  <input
                    type="number"
                    value={formData.targetSalary}
                    onChange={(e) => handleInputChange('targetSalary', e.target.value)}
                    placeholder="e.g., 100000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Time Commitment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Time Commitment for Learning
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'Part Time', label: 'Part Time', desc: '10-15 hrs/week' },
                    { key: 'Full Time', label: 'Full Time', desc: '30-40 hrs/week' },
                    { key: 'Weekends', label: 'Weekends', desc: '8-12 hrs/week' }
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleInputChange('timeCommitment', option.key)}
                      className={`p-4 text-center border-2 rounded-lg transition-all ${
                        formData.timeCommitment === option.key
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">❌ {error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Recommendations...
                    </>
                  ) : (
                    'Next →'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  }

  // Step 2: Show Recommendations
  if (currentStep === 2 && recommendations) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Career Recommendations</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎯 Personalized Career Path
              </h3>
              <p className="text-green-700">
                Based on your profile: {formData.currentRole} with {formData.experienceLevel} experience
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-2">AI Recommendations:</h4>
                <div className="text-blue-700 whitespace-pre-wrap">
                  <RecommendationDisplay
                    profile={formData.currentRole} // or however you're storing the role
                    location={formData.location}
                    recommendation={recommendations.recommendations}
                    marketStats={{
                      avgSalary: recommendations.recommendations.market_stats?.average_salary,
                      openings: recommendations.recommendations.market_stats?.openings,
                      topCompanies: recommendations.recommendations.market_stats?.top_companies,
                    }}
                    roadmap={recommendations.roadmap}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                ← Back to Profile
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default CareerPathwayAdvisor;
