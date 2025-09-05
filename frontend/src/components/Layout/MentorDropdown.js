// frontend/src/components/Layout/MentorDropdown.js
import React, { useState, useEffect } from 'react';
import { useEvaluation } from '../../context/EvaluationContext';
import { useAssignments } from '../../hooks/useAssignments';
import apiService from '../../services/api';

const MentorDropdown = () => {
  const { state, dispatch } = useEvaluation();
  const { fetchAssignments } = useAssignments();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const mentors = await apiService.getAllMentors();
      dispatch({ type: 'SET_MENTORS', payload: mentors });
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleMentorChange = async (mentor) => {
    if (mentor.id === state.currentMentor.id) {
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      dispatch({ type: 'SET_CURRENT_MENTOR', payload: mentor });
      await fetchAssignments();
      setIsOpen(false);
    } catch (error) {
      console.error('Error switching mentor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {state.currentMentor.name?.charAt(0) || 'M'}
          </span>
        </div>
        <div className="text-left">
          <div className="font-medium">{state.currentMentor.name}</div>
          <div className="text-xs text-gray-500">
            {loading ? 'Switching...' : 'Switch Mentor'}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Available Mentors
            </div>
            {state.allMentors.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">Loading mentors...</div>
            ) : (
              state.allMentors.map((mentor) => (
                <button
                  key={mentor.id}
                  onClick={() => handleMentorChange(mentor)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                    mentor.id === state.currentMentor.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {mentor.name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{mentor.name}</div>
                    <div className="text-xs text-gray-500">{mentor.email}</div>
                  </div>
                  {mentor.id === state.currentMentor.id && (
                    <svg
                      className="w-4 h-4 text-blue-600 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MentorDropdown;
