import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AboutPage from './pages/AboutPage';
import FaqsPage from './pages/FaqsPage';
import CoursesPage from './pages/CoursesPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import UserCoursesPage from './pages/dashboard/UserCoursesPage';
import AddCoursePage from './pages/dashboard/AddCoursePage';
import EditCoursePage from './pages/dashboard/EditCoursePage';
import CourseDetailsPage from './pages/dashboard/CourseDetailsPage';
import QuizzesPage from './pages/dashboard/QuizzesPage';
import AddQuizPage from './pages/dashboard/AddQuizPage';
import AssignQuizPage from './pages/dashboard/AssignQuizPage';
import StudyMaterialsPage from './pages/dashboard/StudyMaterialsPage';

// Type definitions
type User = {
  id: string;
  email: string;
  role: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<string>('student');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentRole(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage currentRole={currentRole} onRoleChange={handleRoleChange} />} />
        <Route path="/about" element={<AboutPage currentRole={currentRole} onRoleChange={handleRoleChange} />} />
        <Route path="/faqs" element={<FaqsPage currentRole={currentRole} onRoleChange={handleRoleChange} />} />
        <Route path="/courses" element={<CoursesPage currentRole={currentRole} onRoleChange={handleRoleChange} />} />
        
        {/* Auth routes */}
        <Route path="/login/:role" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register/:role" element={<RegisterPage onRegister={handleLogin} />} />
        
        {/* Dashboard routes */}
        <Route path="/student" element={<DashboardLayout role="student" onRoleChange={handleRoleChange} />}>
          <Route path="dashboard" element={<DashboardPage role="student" />} />
          <Route path="courses" element={<UserCoursesPage role="student" />} />
          <Route path="courses/:id" element={<CourseDetailsPage role="student" />} />
          <Route path="quizzes" element={<QuizzesPage role="student" />} />
          <Route path="profile" element={<div>User Profile Page Placeholder</div>} /> {/* Placeholder for UserProfilePage */}
          <Route path="change-password" element={<div>Change Password Page Placeholder</div>} /> {/* Placeholder for ChangePasswordPage */}
        </Route>
        
        <Route path="/teacher" element={<DashboardLayout role="teacher" onRoleChange={handleRoleChange} />}>
          <Route path="dashboard" element={<DashboardPage role="teacher" />} />
          <Route path="courses" element={<UserCoursesPage role="teacher" />} />
          <Route path="courses/add" element={<AddCoursePage />} />
          <Route path="courses/edit/:id" element={<EditCoursePage />} />
          <Route path="courses/:id" element={<CourseDetailsPage role="teacher" />} />
          <Route path="courses/:id/materials" element={<StudyMaterialsPage role="teacher" />} />
          <Route path="quizzes" element={<QuizzesPage role="teacher" />} />
          <Route path="quizzes/add" element={<AddQuizPage />} />
          <Route path="quizzes/assign/:id" element={<AssignQuizPage />} />
          <Route path="profile" element={<div>User Profile Page Placeholder</div>} /> {/* Placeholder for UserProfilePage */}
          <Route path="change-password" element={<div>Change Password Page Placeholder</div>} /> {/* Placeholder for ChangePasswordPage */}
        </Route>
        
        {/* Redirect /login to the appropriate role login page */}
        <Route path="/login" element={<Navigate to={`/login/${currentRole}`} replace />} />
        <Route path="/register" element={<Navigate to={`/register/${currentRole}`} replace />} />
        
        {/* 404 route - Removed as NotFoundPage does not exist */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
