// frontend/src/components/Layout/Navbar.js
import React from 'react';
import { useEvaluation } from '../../context/EvaluationContext';

const Navbar = () => {
  const { state } = useEvaluation();
  const { currentMentor } = state;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Evaluation Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {currentMentor.name}</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              {currentMentor.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;