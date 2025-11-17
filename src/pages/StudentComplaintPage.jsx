import React, { useState } from 'react';
import '../assets/StudentComplaintPage.css'; // Make sure you created this CSS file

function StudentComplaintsPage() {
  // State for the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // State for the list of complaints
  const [complaints, setComplaints] = useState([]);
  
  // State for the toast message
  const [toast, setToast] = useState('');

  // Function to show a toast message
  const showToast = (message) => {
    setToast(message);
    // Hide toast after 2.5 seconds (like your original script)
    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!title || !description) return; // Basic validation

    const newComplaint = {
      id: Math.random(), // Simple unique ID for now
      title,
      description,
      date: new Date().toLocaleString(),
      status: 'Pending',
    };

    // Add the new complaint to the list (newest first)
    setComplaints([newComplaint, ...complaints]);

    // Reset the form
    setTitle('');
    setDescription('');
    
    showToast('Complaint submitted successfully!');
  };

  // Handle deleting a complaint
  const handleDelete = (id) => {
    // Filter out the complaint with the matching id
    setComplaints(complaints.filter((c) => c.id !== id));
    showToast('Complaint deleted.');
  };

  return (
    <>
      {/* The Toast element (renders only when 'toast' has a message) */}
      {toast && <div className="toast">{toast}</div>}

      <div className="container">
        <div className="head">
          <h1>SmartCampus Complaints</h1>
          <p>Submit issues and track your complaints in real-time</p>
        </div>

        <div className="card">
          <h2>Submit a New Complaint</h2>
          {/* Use React's onSubmit handler and state-controlled inputs */}
          <form onSubmit={handleSubmit} className="report-form">
            <input
              type="text"
              placeholder="Complaint Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              rows="3"
              placeholder="Issue Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit Complaint</button>
          </form>
        </div>

        <div className="card">
          <h2>Submitted Complaints</h2>
          <table className="reports-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if the complaints list is empty */}
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No complaints submitted yet.
                  </td>
                </tr>
              ) : (
                /* Map over the complaints state to create table rows */
                complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.title}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.date}</td>
                    <td>
                      <span className="status">{complaint.status}</span>
                    </td>
                    <td>
                      {/* Use React's onClick handler */}
                      <button
                        onClick={() => handleDelete(complaint.id)}
                        className="btn delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentComplaintsPage;