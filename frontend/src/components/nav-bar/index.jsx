import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '../../createIntance';
import { logOut } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import './index.css';

function NavBar() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.auth.login.currentUser);
  const axiosJWT = createAxios(currentUser, dispath, loginSuccess);

  const handleLogOut = () => {
    console.log(11111, currentUser);
    logOut(dispath, currentUser._id, navigate, currentUser.accessToken, axiosJWT);
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">Home</Link>
      {currentUser? (
        <>
          <p className="navbar-user">Hi, <span> {currentUser?.username}</span> </p>
          <Link to="" className="navbar-logout" onClick={handleLogOut}>Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">Login</Link>
          <Link to="/register" className="navbar-register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;