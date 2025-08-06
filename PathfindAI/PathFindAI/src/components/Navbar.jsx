import React from 'react'
import {TrendingUp} from 'lucide-react';


const Navbar = () => {
  return (
    <div>
         {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PathfindAI
            </h1>
          </div>
          <p className="text-xl text-gray-600">Your AI-powered career intelligence platform</p>
          <p className="text-sm text-gray-500 mt-2">Discover, develop, and accelerate your professional growth</p>
        </div>
    </div>
  )
}

export default Navbar