// frontend/src/context/EvaluationContext.js
import React, { createContext, useContext, useReducer } from 'react';

const EvaluationContext = createContext();

const initialState = {
  currentMentor: { id: 'cmf2pk1gk0004v2lwr3nw88em', name: 'Dr. Smith', email: 'dr.smith@college.edu' }, // Actual DB data
  allMentors: [],
  assignments: [],
  availableStudents: [],
  parameters: [],
  loading: false,
  error: null
};

function evaluationReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_MENTORS':
      return { ...state, allMentors: action.payload };
    case 'SET_CURRENT_MENTOR':
      return { ...state, currentMentor: action.payload, assignments: [], availableStudents: [] };
    case 'SET_ASSIGNMENTS':
      return { ...state, assignments: action.payload, loading: false };
    case 'SET_AVAILABLE_STUDENTS':
      return { ...state, availableStudents: action.payload };
    case 'SET_PARAMETERS':
      return { ...state, parameters: action.payload };
    case 'ADD_ASSIGNMENT':
      return { ...state, assignments: [...state.assignments, action.payload] };
    case 'REMOVE_ASSIGNMENT':
      return { 
        ...state, 
        assignments: state.assignments.filter(a => a.id !== action.payload) 
      };
    case 'UPDATE_MARKS':
      return {
        ...state,
        assignments: state.assignments.map(a =>
          a.id === action.payload.assignmentId
            ? { ...a, marks: action.payload.marks }
            : a
        )
      };
    default:
      return state;
  }
}

export function EvaluationProvider({ children }) {
  const [state, dispatch] = useReducer(evaluationReducer, initialState);

  return (
    <EvaluationContext.Provider value={{ state, dispatch }}>
      {children}
    </EvaluationContext.Provider>
  );
}

export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluation must be used within EvaluationProvider');
  }
  return context;
};