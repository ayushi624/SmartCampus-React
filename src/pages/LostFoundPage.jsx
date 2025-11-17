import React, { useEffect, useState } from "react";
import "../assets/LostFoundPage.css";

const STORAGE_KEY = "lostFoundItems";

export default function LostFoundPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(null); // "lost" | "found" | null
  const emptyForm = { name: "", desc: "", loc: "", contact: "" };
  const [form, setForm] = useState(emptyForm);

  // load items
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setItems(stored);
  }, []);

  // persist items
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function open(type) {
    setForm(emptyForm);
    setOpenModal(type);
  }
  function closeModal() {
    setOpenModal(null);
    setForm(emptyForm);
  }
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function submitItem(type) {
    if (!form.name.trim() || !form.desc.trim() || !form.loc.trim()) {
      alert("Please fill all required fields!");
      return;
    }
    const newItem = {
      id: Date.now(),
      type,
      name: form.name.trim(),
      desc: form.desc.trim(),
      loc: form.loc.trim(),
      contact: form.contact.trim(),
      date: new Date().toLocaleDateString(),
    };
    setItems(prev => [newItem, ...prev]);
    closeModal();
  }
  function filteredList() {
    return filter === "all" ? items : items.filter(i => i.type === filter);
  }
  function removeItem(id) {
    if (!window.confirm("Delete this entry?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="lf-page">
      <header className="lf-header-bar">
        <div className="lf-header-inner">
          <div>
            <h1 className="lf-logo">Lost & Found</h1>
            <p className="lf-sub">Community noticeboard — help classmates find items</p>
          </div>
        </div>
      </header>

      <main className="lf-container">
        <section className="lf-controls">
          <div className="lf-btn-group">
            <button className="lf-btn lf-btn-lost" onClick={() => open("lost")}>
              Report a Lost Item
            </button>
            <button className="lf-btn lf-btn-found" onClick={() => open("found")}>
              Report a Found Item
            </button>
          </div>

          <div className="lf-filter-bar" role="toolbar" aria-label="filters">
            <button
              className={`lf-filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Items
            </button>
            <button
              className={`lf-filter-btn ${filter === "lost" ? "active" : ""}`}
              onClick={() => setFilter("lost")}
            >
              Lost
            </button>
            <button
              className={`lf-filter-btn ${filter === "found" ? "active" : ""}`}
              onClick={() => setFilter("found")}
            >
              Found
            </button>
          </div>
        </section>

        <section className="lf-card-grid" aria-live="polite">
          {filteredList().length === 0 ? (
            <div className="lf-empty">No items to display.</div>
          ) : (
            filteredList().map(item => (
              <article className="lf-card" key={item.id}>
                <div className="lf-card-header">
                  <h3 className="lf-card-title">{item.name}</h3>
                  <div className={`lf-tag lf-tag-${item.type}`}>
                    {item.type === "lost" ? "Lost" : "Found"}
                  </div>
                </div>

                <p className="lf-desc">{item.desc}</p>

                <div className="lf-card-meta">
                  <div className="meta-item"><strong>{item.type === "lost" ? "Last Seen:" : "Found At:"}</strong> {item.loc}</div>
                  <div className="meta-item"><strong>Date:</strong> {item.date}</div>
                </div>

                <div className="lf-card-footer">
                  {item.contact ? (
                    <a href={`mailto:${item.contact}`}>{item.type === "lost" ? "Contact Owner →" : "Contact Finder →"}</a>
                  ) : (
                    <a href="#!">View Details →</a>
                  )}

                  <div className="lf-card-actions">
                    <button className="lf-small" onClick={() => removeItem(item.id)} title="Delete">🗑️</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      {/* Modal */}
      {openModal && (
        <div className="lf-modal" onClick={closeModal}>
          <div className="lf-modal-content" onClick={e => e.stopPropagation()}>
            <div className="lf-modal-header">
              <h2>{openModal === "lost" ? "Report a Lost Item" : "Report a Found Item"}</h2>
              <button className="lf-close" onClick={closeModal} aria-label="Close">&times;</button>
            </div>

            <div className="lf-modal-body">
              <label className="lf-field">
                <span>Item Name</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g., Black leather wallet" />
              </label>

              <label className="lf-field">
                <span>Description</span>
                <textarea name="desc" value={form.desc} onChange={handleChange} rows={3} placeholder="Any identifying details..." />
              </label>

              <label className="lf-field">
                <span>{openModal === "lost" ? "Last Seen Location" : "Location Found"}</span>
                <input name="loc" value={form.loc} onChange={handleChange} placeholder="e.g., Library 2nd floor" />
              </label>

              <label className="lf-field">
                <span>Your Contact Email (optional)</span>
                <input name="contact" value={form.contact} onChange={handleChange} type="email" placeholder="you@example.com" />
              </label>
            </div>

            <div className="lf-modal-footer">
              <button className="lf-btn" onClick={closeModal}>Cancel</button>
              <button className="lf-btn lf-btn-primary" onClick={() => submitItem(openModal)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
