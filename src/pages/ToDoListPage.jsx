import React, { useState, useEffect } from 'react';
import '../assets/ToDoList.css'; // Import the CSS you just created
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

function ToDoListPage() {
  // === STATE ===

  // Lazy initializer: Runs once to get tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  });
  
  // State for the form inputs
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('academic');
  const [dueDate, setDueDate] = useState('');

  // State for the current filter
  const [currentFilter, setCurrentFilter] = useState('all');

  // === EFFECT ===
  // This effect runs *only* when the 'tasks' array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // === EVENT HANDLERS ===
  // Add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't add empty tasks

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category: category,
      dueDate: dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]); // Add new task to the top
    
    // Reset form
    setTitle('');
    setCategory('academic');
    setDueDate('');
  };

  // Toggle a task's completed status
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit a task (using the same prompt as your original code)
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    const newTitle = prompt('Edit task:', taskToEdit.title);
    
    if (newTitle && newTitle.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle.trim() } : task
        )
      );
    }
  };

  // === FILTERING LOGIC ===
  // This calculates the tasks to show based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    // This is the content from your HTML's <main> tag
    <div className="container">
      <div className="title-section">
        <h2>My To-Do List</h2>
        <p>Organize your tasks, stay on track, and boost your productivity.</p>
      </div>

      <div className="panel">
        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group" style={{ flexGrow: 2 }}>
            <label htmlFor="task-title">Task Name</label>
            <input
              type="text"
              id="task-title"
              placeholder="e.g., Complete Physics homework"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-category">Category</label>
            <select
              id="task-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="academic">Academic</option>
              <option value="personal">Personal</option>
              <option value="club">Club Activity</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              type="date"
              id="task-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>

      <div className="controls">
        <div className="filter-bar">
          <button
            className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="panel">
        <ul className="task-list">
          {/* This is the React "loop" that replaces your renderTasks() function */}
          {filteredTasks.length === 0 ? (
            <li className="empty-message">No tasks to show.</li>
          ) : (
            filteredTasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
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
                      <span>Due: {task.dueDate || 'No date'}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      className="action-btn"
                      title="Edit"
                      onClick={() => handleEdit(task.id)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="action-btn"
                      title="Delete"
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
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