import React, { useState } from 'react';
import '../assets/TeacherComplaints.css'; // Make sure you created this CSS file

// Initial mock data based on your static HTML
const initialComplaints = [
  {
    id: 'STU1023',
    title: 'WiFi not working',
    description: 'The campus WiFi is down in the library area.',
    date: '9/03/2025, 10:15 AM',
    status: 'Pending',
  },
  {
    id: 'STU1056',
    title: 'Classroom Fan Broken',
    description: 'Fan in Room 205 is not working.',
    date: '9/03/2025, 11:45 AM',
    status: 'In Progress',
  },
  // You can add more mock data here if you like
];

function TeacherComplaintsPage() {
  // State to hold the list of complaints
  const [complaints, setComplaints] = useState(initialComplaints);

  // Handle status changes from the dropdown
  const handleStatusChange = (id, newStatus) => {
    // Update the local state
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
    // In a real app, you would now update this in Supabase
    console.log(`Complaint ${id} status updated to ${newStatus}`);
  };

  return (
    // Use the 'container' and 'head' classes from your CSS
    <div className="container">
      <div className="head">
        <h1>Complaint Management</h1>
        <p>Review, track, and update student complaints</p>
      </div>

      <div className="card">
        <h2>Student Complaints Overview</h2>
        <table className="reports-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the complaints state to create rows */}
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.date}</td>
                <td>
                  {/* This is now a controlled component */}
                  <select
                    className="status-select"
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherComplaintsPage;