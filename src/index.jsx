import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './style/index.css'
import './style/setup.css'

import LoginPage from './components/LoginPage';
import TodoPage from './components/TodoPage';

const root = createRoot(document.getElementById('root'));
const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

root.render(
  <Router>
    <Routes>
      <Route path="/" element={ <Navigate to="/login" />} />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  </Router>
);
