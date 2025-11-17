import React, { useEffect } from "react";
import "../assets/student-attendance.css";

export default function StudentAttendance() {
  
  // ===== SAMPLE STATIC VALUES =====
  const attended = 41;
  const total = 47;
  const overallPercent = Math.round((attended / total) * 100);

  // ===== BUNK CALCULATION (REAL FORMULA) =====
  const maxTotalAllowed = attended / 0.75;
  const bunksLeft = Math.max(0, Math.floor(maxTotalAllowed - total));

  // ===== Progress Bar Animation =====
  useEffect(() => {
    document.querySelectorAll(".bar-fill, .progress-fill").forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.transition = "width 1s ease";
        bar.style.width = width;
      }, 100);
    });
  }, []);

  return (
    <div className="content">

      {/* ===== SUMMARY ===== */}
      <section className="welcome">
        <h2>Your Attendance Overview</h2>
        <p className="muted">Updated automatically based on your class records.</p>

        <div className="stats">
          <div className="stat">
            <h3>{overallPercent}<small>%</small></h3>
            <p>Overall Attendance</p>
          </div>

          <div className="stat">
            <h3>{attended}<small>/{total}</small></h3>
            <p>Classes Attended</p>
          </div>

          <div className="stat">
            <h3>{total - attended}</h3>
            <p>Total Absences</p>
          </div>

          <div className="stat">
            <h3>{bunksLeft}</h3>
            <p>Bunks Available*</p>
          </div>
        </div>

        {/* Warnings Based on Attendance */}
        {overallPercent < 75 ? (
          <p style={{ color: "red", marginTop: "5px" }}>
            ⚠️ You are below 75%. Attend your next classes!
          </p>
        ) : bunksLeft === 0 ? (
          <p style={{ color: "#f97316", marginTop: "5px" }}>
            ⚠️ No bunks left. One more absence will drop you below 75%.
          </p>
        ) : (
          <p style={{ color: "#10b981", marginTop: "5px" }}>
            ✓ You can safely bunk <b>{bunksLeft}</b> more classes.
          </p>
        )}
      </section>

      {/* ===== SUBJECT BREAKDOWN ===== */}
      <section className="subject-breakdown">
        <h2>Subject-wise Breakdown</h2>

        <div className="Subjects">

          {/* DSOOPS */}
          <div className="subject-card">
            <div className="card-header">
              <h4>DSOOPS</h4>
              <span className="subject-percentage high">92%</span>
            </div>
            <p className="subject-stats">Attended 12 out of 13 classes</p>
            <div className="progress-bar">
              <div className="progress-fill high" style={{ width: "92%" }}></div>
            </div>
          </div>

          {/* Discrete Mathematics */}
          <div className="subject-card">
            <div className="card-header">
              <h4>Discrete Mathematics</h4>
              <span className="subject-percentage high">88%</span>
            </div>
            <p className="subject-stats">Attended 15 out of 17 classes</p>
            <div className="progress-bar">
              <div className="progress-fill high" style={{ width: "88%" }}></div>
            </div>
          </div>

          {/* DECA */}
          <div className="subject-card">
            <div className="card-header">
              <h4>DECA</h4>
              <span className="subject-percentage low">67%</span>
            </div>
            <p className="subject-stats">Attended 10 out of 15 classes</p>
            <div className="progress-bar">
              <div className="progress-fill low" style={{ width: "67%" }}></div>
            </div>
          </div>

          {/* OS */}
          <div className="subject-card">
            <div className="card-header">
              <h4>Operating Systems</h4>
              <span className="subject-percentage high">95%</span>
            </div>
            <p className="subject-stats">Attended 19 out of 20 classes</p>
            <div className="progress-bar">
              <div className="progress-fill high" style={{ width: "95%" }}></div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== COMPARISON BAR CHART ===== */}
      <section className="panel">
        <h2>Attendance Comparison</h2>

        <div className="bar-chart">

          <div className="bar">
            <span className="label">DSOOPS</span>
            <div className="bar-fill" style={{ width: "92%" }}></div>
            <span className="value">92%</span>
          </div>

          <div className="bar">
            <span className="label">Discrete</span>
            <div className="bar-fill" style={{ width: "88%" }}></div>
            <span className="value">88%</span>
          </div>

          <div className="bar">
            <span className="label">DECA</span>
            <div className="bar-fill" style={{ width: "67%" }}></div>
            <span className="value">67%</span>
          </div>

          <div className="bar">
            <span className="label">OS</span>
            <div className="bar-fill" style={{ width: "95%" }}></div>
            <span className="value">95%</span>
          </div>

        </div>
      </section>

    </div>
  );
}
