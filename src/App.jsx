import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createClient } from '@supabase/supabase-js';
import Layout from './layouts/Layout';
import Dashboard from './components/dashboard';
import TeacherAttendance from './pages/TeacherAttendance';
import StudentAttendance from './pages/StudentAttendance';
import MyVault from './pages/MyVault';
import StudentComplaintPage from './pages/StudentComplaintPage';

const StudentToDoPage = () => <div>Student To-Do Page</div>;
const StudentLostFoundPage = () => <div>Student Lost & Found Page</div>;
const TeacherComplaintsPage = () => <div>Teacher Complaints Page</div>;

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


function App() {
  const navigate = useNavigate();
  const location = useLocation();


  const [userDetails, setUserDetails] = useState("");


  useEffect(() => {

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Session:", session);

      if (session && location.pathname === "/login") {
        navigate("/dashboard", { replace: true });
      }
    };

    checkSession();
  }, [navigate, location.pathname]);


  useEffect(() => {
    const getUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: row } = await supabase
        .from("instruments")
        .select("*")
        .eq("id", user.id)
        .single();

      setUserDetails(row)

    };

    getUsers();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<Layout role={userDetails?.role} />}>
        <Route path="dashboard" element={<Dashboard
          userName={userDetails?.userName}
          role={userDetails?.role}
        />
        } />
        <Route path="student/myvault" element={<MyVault />} />
        <Route path="student/todo" element={<StudentToDoPage />} />
        <Route path="student/attendance" element={<StudentAttendance />} />
        <Route path="student/complaints" element={<StudentComplaintPage />} />
        <Route path="student/lost-found" element={<StudentLostFoundPage />} />
      </Route>

      <Route path="/" element={<Layout role={userDetails?.role} />}>
        <Route path="teacher" element={<Dashboard userName={userDetails?.userName} />} />
        <Route path="teacher/attendance" element={<TeacherAttendance />} />
        <Route path="teacher/complaints" element={<TeacherComplaintsPage />} />
        <Route path="teacher/lost-found" element={<StudentLostFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;