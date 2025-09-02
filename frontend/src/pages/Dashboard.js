// frontend/src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useEvaluation } from '../context/EvaluationContext';
import { useAssignments } from '../hooks/useAssignments';
import StatsCard from '../components/Dashboard/StatsCard';
import AssignmentsList from '../components/Dashboard/AssignmentsList';

const Dashboard = () => {
  const { state } = useEvaluation();
  const { assignments, loading } = state;
  const { fetchAssignments } = useAssignments();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const stats = {
    totalStudents: assignments.length,
    markedStudents: assignments.filter(a => a.marks?.length > 0).length,
    unmarkedStudents: assignments.filter(a => !a.marks?.length).length,
    isSubmitted: assignments.every(a => a.isLocked)
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Students" 
          value={stats.totalStudents}
          max={4}
          color="blue"
        />
        <StatsCard 
          title="Marked" 
          value={stats.markedStudents}
          color="green"
        />
        <StatsCard 
          title="Unmarked" 
          value={stats.unmarkedStudents}
          color="yellow"
        />
        <StatsCard 
          title="Status" 
          value={stats.isSubmitted ? "Submitted" : "Pending"}
          color={stats.isSubmitted ? "green" : "red"}
        />
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
        <AssignmentsList assignments={assignments} showActions={false} />
      </div>
    </div>
  );
};

export default Dashboard;