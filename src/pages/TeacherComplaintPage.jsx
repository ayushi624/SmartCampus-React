import React, { useState } from 'react';
import '../assets/TeacherComplaints.css'; // Make sure you created this CSS file

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
];

function TeacherComplaintsPage() {
  const [complaints, setComplaints] = useState(initialComplaints);

  const handleStatusChange = (id, newStatus) => {
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
    console.log(`Complaint ${id} status updated to ${newStatus}`);
  };

  return (
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
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.date}</td>
                <td>
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