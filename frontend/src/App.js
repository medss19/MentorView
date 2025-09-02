// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EvaluationProvider } from './context/EvaluationContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Evaluation from './pages/Evaluation';

function App() {
  return (
    <EvaluationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/evaluation" element={<Evaluation />} />
          </Routes>
        </Layout>
      </Router>
    </EvaluationProvider>
  );
}

export default App;