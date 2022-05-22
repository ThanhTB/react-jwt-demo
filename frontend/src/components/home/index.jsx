import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../createIntance';
import { deleteUser, getUsers } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import './index.css';

function Home() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.login.currentUser);
  const userList = useSelector(state => state.user.users.allUsers);
  const msg = useSelector(state => state.user.msg);

  const axiosJWT = createAxios(currentUser, dispath, loginSuccess);

  function initialData() {
    if (!currentUser) {
      navigate('/login');
    }
    if (currentUser?.accessToken) {
      getUsers(currentUser.accessToken, dispath, axiosJWT);
    }
  }

  useEffect(() => {
    initialData();
  }, []);

  const handleDelete = userId => {
    deleteUser(currentUser.accessToken, dispath, userId, axiosJWT);
  }

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${currentUser?.admin ? `Admin` : `User`}`}
      </div>
      <div className="home-userlist">
        {userList.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}>Delete</div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
  );
}

export default Home;