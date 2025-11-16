import React from "react";
import "../assets/teacher-attendance.css";

export default function TeacherAttendance() {
  return (
    <div className="content">
      <h1>Attendance Summary</h1>

      <section className="welcome">
        <p className="subtitle">Here is your class attendance overview.</p>

        <div className="stats">
          <div className="stats-grid">
            <div className="stat">
              <h3>3</h3>
              <p>Classes Today</p>
            </div>

            <div className="stat">
              <h3>5</h3>
              <p>Tasks Pending</p>
            </div>

            <div className="stat">
              <h3>94</h3>
              <p>Attendance %</p>
            </div>

            <div className="stat">
              <h3>--</h3>
              <p>Other</p>
            </div>
          </div>
        </div>
      </section>

      <h2 className="section-title">Class-wise Attendance</h2>

      <div className="container">
        <div className="panel">
          <h3>CS301 - DSOOPS</h3>
          <p>Attended 12 / 15</p>
        </div>

        <div className="panel">
          <h3>CS302 - Data Structures</h3>
          <p>Attended 14 / 15</p>
        </div>

        <div className="panel">
          <h3>CS303 - DBMS</h3>
          <p>Attended 13 / 15</p>
        </div>
      </div>

      {/* Example: per-student list or actions */}
      <section className="panel" style={{ marginTop: 20 }}>
        <h3>Take Attendance</h3>
        <p>Use the class list to mark present/absent.</p>
        <div style={{ marginTop: 12 }}>
          <button className="btn primary">Open Class List</button>
        </div>
      </section>
    </div>
  );
}
