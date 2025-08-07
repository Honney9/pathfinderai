import React from "react";

const RecommendationDisplay = ({ profile, location, recommendation, marketStats, roadmap }) => {
 
  return (
    <div className="bg-white shadow-xl p-8 rounded-2xl space-y-6">
      {/* Career Title */}
      <h2 className="text-2xl font-bold text-indigo-700">🎯 Career Match: {recommendation.job}</h2>
      <p className="text-gray-600">
        Based on your profile: <strong>{profile}</strong> in <strong>{location}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Skills */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-blue-800 font-semibold mb-2">🛠️ Required Skills</h3>
          <ul className="list-disc list-inside text-blue-700">
            {recommendation.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Market Stats */}
        {marketStats && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-green-800 font-semibold mb-2">📊 Market Stats</h3>
            {marketStats.avgSalary && <p><strong>Avg Salary:</strong> {marketStats.avgSalary}</p>}
            {marketStats.openings && <p><strong>Openings:</strong> {marketStats.openings}</p>}
            {marketStats.topCompanies?.length > 0 && (
              <p><strong>Top Companies:</strong> {marketStats.topCompanies.join(", ")}</p>
            )}
          </div>
        )}
      </div>

      {/* Salary Range */}
      {recommendation.salary && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-yellow-800 font-semibold mb-2">💰 Salary Range</h3>
          <p className="text-yellow-700">{recommendation.salary}</p>
        </div>
      )}

      {/* Roadmap */}
      {roadmap?.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="text-purple-800 font-semibold mb-2">🧭 Suggested Roadmap</h3>
          <ol className="list-decimal list-inside text-purple-700 space-y-1">
            {roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default RecommendationDisplay;
