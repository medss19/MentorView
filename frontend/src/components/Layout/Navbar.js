// frontend/src/components/Layout/Navbar.js
import React from 'react';
import { useEvaluation } from '../../context/EvaluationContext';
import MentorDropdown from './MentorDropdown';

const Navbar = () => {
  const { state } = useEvaluation();
  const { currentMentor } = state;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Evaluation Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Welcome, {currentMentor.name}</span>
            <MentorDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;