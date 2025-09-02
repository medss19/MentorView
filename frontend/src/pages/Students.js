// frontend/src/pages/Students.js
import React, { useState, useEffect } from 'react';
import { useEvaluation } from '../context/EvaluationContext';
import { useAssignments } from '../hooks/useAssignments';
import apiService from '../services/api';

const Students = () => {
  const { state } = useEvaluation();
  const { assignStudent, removeAssignment, fetchAssignments } = useAssignments();
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(new Set()); // Track loading per student

  useEffect(() => {
    fetchAvailableStudents();
    fetchAssignments(); // Also fetch assignments on component load
  }, [fetchAssignments]);

  const fetchAvailableStudents = async () => {
    try {
      const students = await apiService.getAvailableStudents();
      setAvailableStudents(students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleAssignStudent = async (studentId) => {
    setLoadingStudents(prev => new Set([...prev, studentId]));
    try {
      await assignStudent(studentId);
      await fetchAvailableStudents(); // Only need to refresh available students
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingStudents(prev => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
    }
  };

  const handleRemoveStudent = async (assignmentId) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await removeAssignment(assignmentId);
        await fetchAvailableStudents(); // Only need to refresh available students
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const canAddMore = state.assignments.length < 4;
  const needsMinimum = state.assignments.length < 3;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>
        <div className="text-sm text-gray-600">
          Assigned: {state.assignments.length}/4 students
          {needsMinimum && <span className="text-red-600 ml-2">(Minimum 3 required)</span>}
        </div>
      </div>

      {/* Current Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Currently Assigned Students</h2>
        {state.assignments.length > 0 ? (
          <div className="space-y-3">
            {state.assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{assignment.student.name}</h3>
                  <p className="text-sm text-gray-600">{assignment.student.rollNo} • {assignment.student.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    assignment.isLocked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {assignment.isLocked ? 'Locked' : 'Can Remove'}
                  </span>
                  {!assignment.isLocked && (
                    <button
                      onClick={() => handleRemoveStudent(assignment.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No students assigned yet</p>
        )}
      </div>

      {/* Available Students */}
      {canAddMore && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Available Students</h2>
          {availableStudents.length > 0 ? (
            <div className="space-y-3">
              {availableStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.rollNo} • {student.email}</p>
                  </div>
                  <button
                    onClick={() => handleAssignStudent(student.id)}
                    disabled={loadingStudents.has(student.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loadingStudents.has(student.id) ? 'Assigning...' : 'Assign'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No available students</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Students;