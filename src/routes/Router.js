import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import Auth from '../component/Pages/Auth/Auth';
import Home from '../component/Pages/Search/Home';

export default function AppRouter() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={token ? <Navigate to="/home" replace /> : <Auth />}
      />
    </Routes>
  );
}
