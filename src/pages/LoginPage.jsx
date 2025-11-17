import { createClient } from '@supabase/supabase-js';
import '../assets/login.css';
import { useState } from 'react';



export default function Login() {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


  const handleLogin = async () => {
    setError(null);

    console.log('coming here')

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (data?.session?.access_token) {
      window.location.href = '/dashboard';
    }

    if(error) {
      setError(error);
    }

    console.log(data, 'data');
    console.log(error, 'error');

  };
console.log(error, 'error state');


  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to SmartCampus</h1>
        <p className="login-subtitle">Your Real-Time Campus Assistant</p>

        <form id="loginForm" noValidate>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="student@university.edu"
              required
              className="input-control"
              onChange={(e) => setEamil(e.target.value)}
            />
            <div className="error">Enter a valid email.</div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              className="input-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error">Password must be at least 6 characters.</div>
          </div>
          <span className='error-text'>{error?.message}</span>


          <button disabled={!password || !email} onClick={handleLogin} type='button' className={!password || !email ? "disabled-btn-login" : "btn-login"}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
