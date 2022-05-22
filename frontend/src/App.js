import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from './components/nav-bar';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
