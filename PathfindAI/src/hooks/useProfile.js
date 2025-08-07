// src/hooks/useProfile.js
import { useState } from 'react';
import ApiService from '../services/api';

export const useProfileSubmission = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitProfile = async (profileData) => {
    console.log("Submitting profile with data:", profileData); // ✅ Add this
    setLoading(true);
    setError(null);
    
    try {
      // Transform form data to match backend expectations
      const transformedData = {
        current_role: profileData.currentRole,
        experience_level: mapExperienceLevel(profileData.experienceLevel),
        education_level: mapEducationLevel(profileData.educationLevel),
        location: profileData.location,
        current_salary: parseInt(profileData.currentSalary) || null,
        target_salary: parseInt(profileData.targetSalary) || null,
        time_commitment: mapTimeCommitment(profileData.timeCommitment),
        skills: profileData.skills || [],
        interests: profileData.interests || []
      };

      const response = await ApiService.submitProfile(transformedData);
      
      if (response.success) {
        setRecommendations(response.data);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get recommendations');
      }
    } catch (err) {
      setError(err.message);
      console.error('Profile submission error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRecommendations(null);
    setError(null);
  };

  return { 
    recommendations, 
    loading, 
    error, 
    submitProfile,
    reset
  };
};

// Helper functions to map form values to backend expectations
const mapExperienceLevel = (level) => {
  const mapping = {
    'entry': 'entry',
    'junior': 'junior', 
    'mid': 'mid',
    'senior': 'senior',
    'executive': 'executive'
  };
  return mapping[level] || 'entry';
};

const mapEducationLevel = (level) => {
  const mapping = {
    'high_school': 'high_school',
    'bachelor': 'bachelor',
    'master': 'master',
    'phd': 'phd',
    'other': 'other'
  };
  return mapping[level] || 'bachelor';
};

const mapTimeCommitment = (commitment) => {
  const mapping = {
    'Part Time': 'part_time',
    'Full Time': 'full_time', 
    'Weekends': 'weekends'
  };
  return mapping[commitment] || 'full_time';
};