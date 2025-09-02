// frontend/src/pages/Evaluation.js
import React, { useState, useEffect } from 'react';
import { useEvaluation } from '../context/EvaluationContext';
import { useAssignments } from '../hooks/useAssignments';
import apiService from '../services/api';

const Evaluation = () => {
  const { state } = useEvaluation();
  const { fetchAssignments } = useAssignments();
  const [parameters, setParameters] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'marked', 'unmarked'

  useEffect(() => {
    initializeData();
  }, [state.assignments]); // Re-run when assignments change

  const initializeData = async () => {
    try {
      setLoading(true);
      // Ensure we have assignments
      if (state.assignments.length === 0) {
        await fetchAssignments();
      }
      
      const parametersData = await apiService.getEvaluationParameters();
      setParameters(parametersData);
      
      // Initialize marks object
      const initialMarks = {};
      state.assignments.forEach(assignment => {
        initialMarks[assignment.id] = {};
        assignment.marks?.forEach(mark => {
          initialMarks[assignment.id][mark.parameter.id] = mark.marksObtained;
        });
      });
      setMarks(initialMarks);
    } catch (error) {
      console.error('Error initializing evaluation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (assignmentId, parameterId, value) => {
    setMarks(prev => ({
      ...prev,
      [assignmentId]: {
        ...prev[assignmentId],
        [parameterId]: parseInt(value) || 0
      }
    }));
  };

  const saveMarks = async (assignmentId) => {
    try {
      const assignmentMarks = marks[assignmentId] || {};
      const marksArray = parameters.map(param => ({
        parameterId: param.id,
        marksObtained: assignmentMarks[param.id] || 0
      }));
      
      await apiService.updateMarks(assignmentId, marksArray);
      await fetchAssignments(); // Refresh data
      alert('Marks saved successfully!');
    } catch (error) {
      alert('Error saving marks: ' + error.message);
    }
  };

  const submitAllAssignments = async () => {
    if (!window.confirm('Are you sure you want to submit all evaluations? This will lock all marks permanently.')) {
      return;
    }
    
    try {
      setSubmitting(true);
      await apiService.submitAssignments(state.currentMentor.id);
      await fetchAssignments();
      alert('All evaluations submitted successfully! Students have been notified.');
    } catch (error) {
      alert('Error submitting evaluations: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotal = (assignmentId) => {
    const assignmentMarks = marks[assignmentId] || {};
    return parameters.reduce((total, param) => {
      return total + (assignmentMarks[param.id] || 0);
    }, 0);
  };

  const getTotalMaxMarks = () => {
    return parameters.reduce((total, param) => total + param.maxMarks, 0);
  };

  const isMarked = (assignment) => {
    return assignment.marks && assignment.marks.length === parameters.length;
  };

  const getFilteredAssignments = () => {
    if (filter === 'marked') {
      return state.assignments.filter(assignment => isMarked(assignment));
    } else if (filter === 'unmarked') {
      return state.assignments.filter(assignment => !isMarked(assignment));
    }
    return state.assignments;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading evaluation data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Evaluation</h1>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All Students ({state.assignments.length})
            </button>
            <button
              onClick={() => setFilter('marked')}
              className={`px-3 py-1 rounded text-sm ${filter === 'marked' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Marked ({state.assignments.filter(a => isMarked(a)).length})
            </button>
            <button
              onClick={() => setFilter('unmarked')}
              className={`px-3 py-1 rounded text-sm ${filter === 'unmarked' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Unmarked ({state.assignments.filter(a => !isMarked(a)).length})
            </button>
          </div>
        </div>
        {state.assignments.length > 0 && !state.assignments[0]?.isLocked && (
          <button
            onClick={submitAllAssignments}
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit All Evaluations'}
          </button>
        )}
      </div>

      {state.assignments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">No students assigned yet.</p>
          <p className="text-gray-400 mt-2">Go to Manage Students to assign students first.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {getFilteredAssignments().map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{assignment.student.name}</h3>
                  <p className="text-gray-600">{assignment.student.rollNo} • {assignment.student.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculateTotal(assignment.id)}/{getTotalMaxMarks()}
                  </div>
                  <div className="text-sm text-gray-500">Total Marks</div>
                </div>
              </div>

              {assignment.isLocked ? (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                  <p className="text-red-800 font-medium">🔒 Marks are locked and cannot be edited</p>
                </div>
              ) : null}

              <div className="grid gap-4">
                {parameters.map((parameter) => (
                  <div key={parameter.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{parameter.name}</h4>
                      <p className="text-sm text-gray-600">{parameter.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={parameter.maxMarks}
                        value={marks[assignment.id]?.[parameter.id] || 0}
                        onChange={(e) => handleMarkChange(assignment.id, parameter.id, e.target.value)}
                        disabled={assignment.isLocked}
                        className="w-20 px-3 py-1 border rounded text-center disabled:bg-gray-100"
                      />
                      <span className="text-gray-500">/ {parameter.maxMarks}</span>
                    </div>
                  </div>
                ))}
              </div>

              {!assignment.isLocked && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => saveMarks(assignment.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Marks
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Evaluation;
