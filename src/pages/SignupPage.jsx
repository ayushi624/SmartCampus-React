import React from 'react';
import { Link } from 'react-router-dom';
// import '../assets/signup.css'; // Remember to import the CSS!

function SignupPage() {



  return (
    <div>
      <h1>Sign Up Page</h1>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
}

export default SignupPage;