import React, { useState, useEffect } from "react";
import "../assets/ToDoList.css";

function ToDoListPage() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("academic");
  const [dueDate, setDueDate] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category,
      dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setCategory("academic");
    setDueDate("");
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (!taskToEdit) return;

    const newTitle = prompt("Edit task:", taskToEdit.title);
    if (!newTitle?.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      {/* HEADER */}
      <div className="title-section">
        <h2>My To-Do List</h2>
        <p>Organize your tasks, stay on track, and boost productivity.</p>
      </div>

      <div className="panel">
        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group" style={{ flexGrow: 2 }}>
            <label>Task Name</label>
            <input
              type="text"
              placeholder="e.g., Complete Physics homework"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="academic">Academic</option>
              <option value="personal">Personal</option>
              <option value="club">Club Activity</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      <div className="controls">
        <div className="filter-bar">
          <button
            className={`filter-btn ${currentFilter === "all" ? "active" : ""}`}
            onClick={() => setCurrentFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${
              currentFilter === "pending" ? "active" : ""
            }`}
            onClick={() => setCurrentFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${
              currentFilter === "completed" ? "active" : ""
            }`}
            onClick={() => setCurrentFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="panel">
        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-message">No tasks to show.</li>
          ) : (
            filteredTasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <div className="task-item">
                  <div className="task-check">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                  </div>

                  <div className="task-details">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span className={`tag tag-${task.category}`}>
                        {task.category}
                      </span>
                      <span>Due: {task.dueDate || "No date"}</span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="action-btn"
                      title="Edit"
                      onClick={() => handleEdit(task.id)}
                    >
                      ✏️
                    </button>

                    <button
                      className="action-btn"
                      title="Delete"
                      onClick={() => handleDelete(task.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ToDoListPage;
