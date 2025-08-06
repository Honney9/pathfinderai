import React, { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp, MapPin, BookOpen, DollarSign, Target, User, Briefcase, Star, Clock, Award } from 'lucide-react';

const CareerPathwayAdvisor = () => {
  const [currentStep, setCurrentStep] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    currentRole: '',
    experience: '',
    education: '',
    skills: [],
    interests: [],
    location: '',
    currentSalary: '',
    targetSalary: '',
    timeCommitment: ''
  });
  const [recommendations, setRecommendations] = useState(null);

  // Sample data for skills, courses, and market trends
  const skillsDatabase = {
    'Software Development': {
      subSkills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 'Cloud Computing'],
      avgSalaryIncrease: 35000,
      demandGrowth: 22,
      timeToMaster: '6-12 months'
    },
    'Data Science': {
      subSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
      avgSalaryIncrease: 40000,
      demandGrowth: 31,
      timeToMaster: '8-15 months'
    },
    'Digital Marketing': {
      subSkills: ['SEO', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'PPC', 'Email Marketing'],
      avgSalaryIncrease: 20000,
      demandGrowth: 18,
      timeToMaster: '4-8 months'
    },
    'UX/UI Design': {
      subSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      avgSalaryIncrease: 25000,
      demandGrowth: 24,
      timeToMaster: '6-10 months'
    },
    'Project Management': {
      subSkills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Management', 'Budget Planning'],
      avgSalaryIncrease: 22000,
      demandGrowth: 16,
      timeToMaster: '3-6 months'
    },
    'Cybersecurity': {
      subSkills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance', 'Incident Response'],
      avgSalaryIncrease: 45000,
      demandGrowth: 28,
      timeToMaster: '8-12 months'
    }
  };

  const coursesDatabase = {
    'Python': [
      { name: 'Complete Python Bootcamp', provider: 'Udemy', duration: '22 hours', rating: 4.6, price: '$89' },
      { name: 'Python for Everybody', provider: 'Coursera', duration: '8 months', rating: 4.8, price: '$49/month' }
    ],
    'Machine Learning': [
      { name: 'Machine Learning Specialization', provider: 'Coursera', duration: '6 months', rating: 4.9, price: '$49/month' },
      { name: 'Deep Learning A-Z', provider: 'Udemy', duration: '22.5 hours', rating: 4.5, price: '$129' }
    ],
    'React': [
      { name: 'React - The Complete Guide', provider: 'Udemy', duration: '48 hours', rating: 4.6, price: '$109' },
      { name: 'Meta React Professional Certificate', provider: 'Coursera', duration: '7 months', rating: 4.7, price: '$49/month' }
    ],
    'Digital Marketing': [
      { name: 'Google Digital Marketing Certificate', provider: 'Coursera', duration: '6 months', rating: 4.7, price: '$49/month' },
      { name: 'Digital Marketing Masterclass', provider: 'Udemy', duration: '36 hours', rating: 4.5, price: '$94' }
    ],
    'UX Design': [
      { name: 'Google UX Design Certificate', provider: 'Coursera', duration: '6 months', rating: 4.8, price: '$49/month' },
      { name: 'UX/UI Design Bootcamp', provider: 'Udemy', duration: '20 hours', rating: 4.4, price: '$99' }
    ],
    'Cybersecurity': [
      { name: 'Google Cybersecurity Certificate', provider: 'Coursera', duration: '6 months', rating: 4.8, price: '$49/month' },
      { name: 'Ethical Hacking Bootcamp', provider: 'Udemy', duration: '15 hours', rating: 4.3, price: '$119' }
    ]
  };

  const locationMultipliers = {
    'San Francisco, CA': 1.4,
    'New York, NY': 1.3,
    'Seattle, WA': 1.25,
    'Austin, TX': 1.1,
    'Chicago, IL': 1.05,
    'Denver, CO': 1.02,
    'Remote': 1.15,
    'Other': 1.0
  };

  const generateRecommendations = () => {
    const currentSal = parseInt(userProfile.currentSalary) || 50000;
    const targetSal = parseInt(userProfile.targetSalary) || 80000;
    const locationMultiplier = locationMultipliers[userProfile.location] || 1.0;

    // AI-like logic to recommend skills based on user profile
    let skillRecommendations = Object.entries(skillsDatabase)
      .map(([skill, data]) => {
        let score = 0;
        
        // Interest matching
        if (userProfile.interests.some(interest => 
          skill.toLowerCase().includes(interest.toLowerCase()) ||
          data.subSkills.some(subSkill => 
            subSkill.toLowerCase().includes(interest.toLowerCase())
          )
        )) {
          score += 30;
        }

        // Salary gap matching
        const potentialIncome = currentSal + (data.avgSalaryIncrease * locationMultiplier);
        if (potentialIncome >= targetSal * 0.8) {
          score += 25;
        }

        // Market demand
        score += data.demandGrowth;

        // Time commitment matching
        const timeMap = { 'part-time': 12, 'full-time': 6, 'weekends': 18 };
        const userTimeMonths = timeMap[userProfile.timeCommitment] || 12;
        const skillTimeMonths = parseInt(data.timeToMaster.split('-')[1]) || 12;
        if (skillTimeMonths <= userTimeMonths) score += 15;

        return {
          skill,
          data,
          score,
          projectedSalary: Math.round(potentialIncome),
          matchReasons: []
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations({
      skills: skillRecommendations,
      currentSalary: currentSal,
      locationMultiplier
    });
  };

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSkillToggle = (skill) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest) => {
    setUserProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const ProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-600">Help us understand your background and goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Role</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Marketing Coordinator"
            value={userProfile.currentRole}
            onChange={(e) => handleInputChange('currentRole', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={userProfile.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
          >
            <option value="">Select experience</option>
            <option value="0-1">0-1 years</option>
            <option value="2-5">2-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Education Level</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={userProfile.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
          >
            <option value="">Select education</option>
            <option value="high-school">High School</option>
            <option value="associates">Associate's Degree</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={userProfile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="">Select location</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="Austin, TX">Austin, TX</option>
            <option value="Chicago, IL">Chicago, IL</option>
            <option value="Denver, CO">Denver, CO</option>
            <option value="Remote">Remote</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Salary ($)</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 65000"
            value={userProfile.currentSalary}
            onChange={(e) => handleInputChange('currentSalary', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Salary ($)</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 100000"
            value={userProfile.targetSalary}
            onChange={(e) => handleInputChange('targetSalary', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Time Commitment for Learning</label>
        <div className="grid grid-cols-3 gap-4">
          {['part-time', 'full-time', 'weekends'].map(time => (
            <button
              key={time}
              className={`p-3 border rounded-lg text-center transition-colors ${
                userProfile.timeCommitment === time
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleInputChange('timeCommitment', time)}
            >
              <div className="font-semibold capitalize">{time.replace('-', ' ')}</div>
              <div className="text-sm text-gray-600">
                {time === 'part-time' && '10-15 hrs/week'}
                {time === 'full-time' && '30-40 hrs/week'}
                {time === 'weekends' && '8-12 hrs/week'}
              </div>
            </button>
          ))}
        </div>     
      </div>
    </div>
  );

  const SkillsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Your Current Skills</h2>
        <p className="text-gray-600">Select the skills you already have</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(skillsDatabase).map(skill => (
          <button
            key={skill}
            className={`p-4 border rounded-lg text-left transition-colors ${
              userProfile.skills.includes(skill)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleSkillToggle(skill)}
          >
            <div className="font-semibold">{skill}</div>
            <div className="text-sm text-gray-600 mt-1">
              {skillsDatabase[skill].subSkills.slice(0, 2).join(', ')}
              {skillsDatabase[skill].subSkills.length > 2 && '...'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const InterestsStep = () => {
    const interests = [
      'Technology', 'Design', 'Marketing', 'Data Analysis', 'Management', 'Security',
      'Artificial Intelligence', 'Web Development', 'Mobile Apps', 'Cloud Computing',
      'Social Media', 'Content Creation', 'Finance', 'Healthcare', 'Education', 'E-commerce'
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Your Interests</h2>
          <p className="text-gray-600">What areas excite you most?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map(interest => (
            <button
              key={interest}
              className={`p-3 border rounded-lg text-center transition-colors ${
                userProfile.interests.includes(interest)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleInterestToggle(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const RecommendationsStep = () => {
    if (!recommendations) return null;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Your Personalized Career Path</h2>
          <p className="text-gray-600">AI-powered recommendations based on your profile</p>
        </div> 

        {/* Current vs Target Salary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Income Projection</h3>
              <p className="text-gray-600">Based on your location and target skills</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                ${recommendations.skills[0]?.projectedSalary.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Projected salary</div>
            </div>
          </div>
        </div>

        {/* Top Skill Recommendations */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Recommended Skills to Acquire</h3>
          {recommendations.skills.map((rec, index) => (
            <div key={rec.skill} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      #{index + 1} Recommended
                    </span>
                    <span className="text-green-600 font-semibold">
                      +{rec.data.demandGrowth}% market growth
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{rec.skill}</h4>
                  <p className="text-gray-600">{rec.data.subSkills.join(' • ')}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +${rec.data.avgSalaryIncrease.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Avg. salary increase</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <div className="text-sm font-semibold">{rec.data.timeToMaster}</div>
                  <div className="text-xs text-gray-600">to master</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-semibold">+{rec.data.demandGrowth}%</div>
                  <div className="text-xs text-gray-600">job growth</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-semibold">${rec.projectedSalary.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">projected salary</div>
                </div>
              </div>

              {/* Course Recommendations */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Recommended Courses</h5>
                <div className="space-y-3">
                  {rec.data.subSkills.slice(0, 2).map(subSkill => {
                    const courses = coursesDatabase[subSkill] || [];
                    return courses.slice(0, 1).map(course => (
                      <div key={course.name} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-semibold text-gray-900">{course.name}</div>
                            <div className="text-sm text-gray-600">{course.provider} • {course.duration}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold">{course.rating}</span>
                          </div>
                          <div className="text-sm font-semibold text-green-600">{course.price}</div>
                        </div>
                      </div>
                    ));
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Insights */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Market Insights for Your Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{userProfile.location}</div>
              <div className="text-sm text-gray-600">
                {((recommendations.locationMultiplier - 1) * 100).toFixed(0)}% above national avg
              </div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">High Demand</div>
              <div className="text-sm text-gray-600">Top skills are in high demand</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold">Growth Potential</div>
              <div className="text-sm text-gray-600">Strong career advancement</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    { id: 'profile', title: 'Profile', component: ProfileStep },
    { id: 'skills', title: 'Skills', component: SkillsStep },
    { id: 'interests', title: 'Interests', component: InterestsStep },
    { id: 'recommendations', title: 'Recommendations', component: RecommendationsStep }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const CurrentStepComponent = steps[currentStepIndex].component;

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStepId = steps[currentStepIndex + 1].id;
      if (nextStepId === 'recommendations') {
        generateRecommendations();
      }
      setCurrentStep(nextStepId);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
       

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStepIndex 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <CurrentStepComponent />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStepIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={currentStepIndex === steps.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStepIndex === steps.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentStepIndex === steps.length - 2 ? 'Get Recommendations' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerPathwayAdvisor;