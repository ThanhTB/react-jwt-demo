import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apiRequest';
import './index.css';

function Login() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    loginUser({ username, password }, dispath, navigate);
  }

  return (
    <section className="login-container">
        <div className="login-title"> Log in</div>
        <form onSubmit={handleLogin}>
            <label>USERNAME</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={event => setUsername(event.target.value)}
            />
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={event => setPassword(event.target.value)}
            />
            <button type="submit"> Continue </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">Register one for free </Link>
    </section>
  );
}

export default Login;