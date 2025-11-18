import React, { useState } from 'react';
import '../assets/StudentComplaintPage.css'; 

function StudentComplaintsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [complaints, setComplaints] = useState([]);
  
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!title || !description) return; 

    const newComplaint = {
      id: Math.random(), 
      title,
      description,
      date: new Date().toLocaleString(),
      status: 'Pending',
    };

    setComplaints([newComplaint, ...complaints]);

    setTitle('');
    setDescription('');
    
    showToast('Complaint submitted successfully!');
  };

  const handleDelete = (id) => {
    setComplaints(complaints.filter((c) => c.id !== id));
    showToast('Complaint deleted.');
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <div className="container">
        <div className="head">
          <h1>SmartCampus Complaints</h1>
          <p>Submit issues and track your complaints in real-time</p>
        </div>

        <div className="card">
          <h2>Submit a New Complaint</h2>
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
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No complaints submitted yet.
                  </td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.title}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.date}</td>
                    <td>
                      <span className="status">{complaint.status}</span>
                    </td>
                    <td>
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