// frontend/src/components/LatestAssignments.js

import React, { useEffect, useState } from 'react';
import { fetchLatestAssignments } from '../api'; 

function LatestAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getLatestAssignments = async () => {
      try {
        const data = await fetchLatestAssignments();
        setAssignments(data);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching latest assignments:', error);
        setError('Failed to fetch latest assignments. Please try again later.');
      }
    };

    getLatestAssignments();
    const interval = setInterval(getLatestAssignments, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Toggle function to show all or only the latest one
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="assignment-container">
      <h2>Latest Project Assignments</h2>
      {error && <p>{error}</p>}
      <button onClick={toggleShowAll} className="toggle-button">
        {showAll ? 'Show Only The Latest' : 'Show All Five'}
      </button>
      {assignments.length ? (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Project Name</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {(showAll ? assignments : [assignments[0]]).map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.employee_id.employee_id}</td>
                <td>{assignment.employee_id.full_name}</td>
                <td>{assignment.project_code.project_name}</td>
                <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No project assignments available.</p>
      )}
    </div>
  );
}

export default LatestAssignments;
