// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useEvaluation } from '../context/EvaluationContext';
import { useAssignments } from '../hooks/useAssignments';
import StatsCard from '../components/Dashboard/StatsCard';
import AssignmentsList from '../components/Dashboard/AssignmentsList';

const Dashboard = () => {
  const { state } = useEvaluation();
  const { assignments, loading, currentMentor } = state;
  const { fetchAssignments } = useAssignments();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const downloadPDF = async () => {
    try {
      setDownloading(true);
      
      // Get mentor ID from current mentor
      const mentorId = currentMentor?.id;
      console.log('Attempting PDF download for mentor:', mentorId, currentMentor?.name);
      
      if (!mentorId) {
        alert('No mentor selected');
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/reports/marksheet/${mentorId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('PDF generation error:', errorText);
        alert(`Failed to generate PDF: ${errorText}`);
        return;
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Marksheet_${currentMentor?.name || 'Mentor'}_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('✅ PDF downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      alert('❌ Failed to download PDF: ' + error.message);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const stats = {
    totalStudents: assignments.length,
    markedStudents: assignments.filter(a => a.marks?.length > 0).length,
    unmarkedStudents: assignments.filter(a => !a.marks?.length).length,
    isSubmitted: assignments.length > 0 && assignments.every(a => a.isLocked)
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

      {/* Download PDF Button */}
      {stats.isSubmitted && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Final Marksheet</h2>
              <p className="text-gray-600">All evaluations completed. Download PDF marksheet.</p>
            </div>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Generating...
                </>
              ) : (
                <>
                  📄 Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
        <AssignmentsList assignments={assignments} showActions={false} />
      </div>
    </div>
  );
};

export default Dashboard;