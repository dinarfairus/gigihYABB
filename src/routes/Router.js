import React from 'react';
//import Navbar from '../component/NavbarSide/Navbar';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import Auth from '../component/Pages/Auth/Auth';
import Home from '../component/Pages/Search/Home';
//import AddPlaylist from '../component/Pages/AddPlaylist/AddPlaylist';

export default function AppRouter() {
  const { token } = useSelector((state) => state.auth);

  return (
    
      <Routes>
        
        <Route
          path="/home"
          element={token ? <Home/> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <Auth />}
        />
        {/* <Route
          path="/add"
          element={token ? <Navigate to="/home" replace /> : <Auth />}
        /> */}
      </Routes>
   
  );
}
