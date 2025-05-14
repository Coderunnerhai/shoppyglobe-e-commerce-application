import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;