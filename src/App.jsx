import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Registration";
import Header from './Components/Header';
import Notes from './Components/Notes';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Corrected path to /notes */}
        <Route 
          path="/notes" 
          element={isAuthenticated ? <Notes /> : <Navigate to="/" />} 
        />
        
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="main">
                <Header />
                <Notes />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
