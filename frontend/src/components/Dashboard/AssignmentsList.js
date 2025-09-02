// frontend/src/components/Dashboard/AssignmentsList.js
import React from 'react';

const AssignmentsList = ({ assignments, showActions = true }) => {
  if (assignments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students assigned yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="pb-2">Student</th>
            <th className="pb-2">Roll No</th>
            <th className="pb-2">Progress</th>
            <th className="pb-2">Status</th>
            {showActions && <th className="pb-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="border-b">
              <td className="py-3">{assignment.student.name}</td>
              <td className="py-3">{assignment.student.rollNo}</td>
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(assignment.marks?.length || 0) * 25}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {assignment.marks?.length || 0}/4
                  </span>
                </div>
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  assignment.isLocked 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {assignment.isLocked ? 'Submitted' : 'Pending'}
                </span>
              </td>
              {showActions && (
                <td className="py-3">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsList;