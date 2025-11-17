import React, { useState, useEffect } from "react";
import "../assets/myvault.css";

export default function MyVault() {
  const [files, setFiles] = useState([]);

  // Load saved files from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("myvault_student_files");
    if (stored) setFiles(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever files change
  useEffect(() => {
    localStorage.setItem("myvault_student_files", JSON.stringify(files));
  }, [files]);

  // Upload handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev) => {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: ev.target.result, // base64
      };

      setFiles((prev) => [...prev, newFile]);
    };

    reader.readAsDataURL(file);
  };

  // Delete handler
  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Calculate storage used
  const totalSizeMB = (
    files.reduce((acc, f) => acc + f.size, 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div className="content">

      <h1>MyVault</h1>

      {/* ---------- Vault Summary Section (UNCHANGED) ---------- */}
      <section className="vault-summary-section">
        <h2>Vault Summary</h2>
        <p className="vault-subtitle">
          Here is an overview of your stored documents.
        </p>

        <div className="vault-stats-row">
          <div className="vault-stat-card">
            <h3>{files.length}</h3>
            <p>Total Files</p>
          </div>

          <div className="vault-stat-card">
            <h3>{totalSizeMB} MB</h3>
            <p>Storage Used</p>
          </div>

          <div className="vault-stat-card">
            <h3>0</h3>
            <p>Shared Files</p>
          </div>

          <div className="vault-stat-card">
            <h3>∞</h3>
            <p>Free Space</p>
          </div>
        </div>
      </section>

      {/* ---------- Upload Box (UNCHANGED UI) ---------- */}
      <section className="upload-box">
        <p>Drag & Drop your files here</p>
        <span>or</span>

        <button
          className="upload-btn"
          onClick={() => document.getElementById("fileInputStudent").click()}
        >
          Browse Files
        </button>

        <input
          type="file"
          id="fileInputStudent"
          hidden
          onChange={handleUpload}
        />
      </section>

      {/* ---------- Documents (UNCHANGED UI) ---------- */}
      <section className="documents">
        <h2>Your Documents</h2>

        <div className="doc-grid">
          {files.length === 0 && (
            <p style={{ color: "#475569" }}>No files uploaded yet.</p>
          )}

          {files.map((file) => (
            <div key={file.id} className="doc-card">
              <div className="doc-icon">📄</div>
              <p className="doc-name">{file.name}</p>

              <div className="doc-actions">
                <button onClick={() => window.open(file.url, "_blank")}>
                  View
                </button>
                <button onClick={() => handleDelete(file.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
