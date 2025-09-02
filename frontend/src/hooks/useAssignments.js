// frontend/src/hooks/useAssignments.js
import { useCallback } from 'react';
import { useEvaluation } from '../context/EvaluationContext';
import apiService from '../services/api';

export const useAssignments = () => {
  const { state, dispatch } = useEvaluation();

  const fetchAssignments = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const assignments = await apiService.getAssignments(state.currentMentor.id);
      dispatch({ type: 'SET_ASSIGNMENTS', payload: assignments });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.currentMentor.id, dispatch]);

  const assignStudent = async (studentId) => {
    try {
      await apiService.assignStudent(state.currentMentor.id, studentId);
      // Always refresh from server instead of optimistic updates
      await fetchAssignments();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const removeAssignment = async (assignmentId) => {
    try {
      await apiService.removeAssignment(assignmentId);
      // Always refresh from server instead of optimistic updates
      await fetchAssignments();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  return { fetchAssignments, assignStudent, removeAssignment };
};