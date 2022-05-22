import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice';
import {
  deleteUsersFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from './userSlice';

export const loginUser = async (user, dispath, navigate) => {
  dispath(loginStart());
  try {
    const res = await axios.post('/v1/auth/login', user);
    dispath(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispath(loginFailed());
  }
};

export const registerUser = async (user, dispath, navigate) => {
  dispath(registerStart());
  try {
    await axios.post('/v1/auth/register', user);
    dispath(registerSuccess());
    navigate('/login');
  } catch (error) {
    dispath(registerFailed());
  }
};

export const getUsers = async (accessToken, dispath, axiosJWT) => {
  dispath(getUsersStart());
  try {
    const res = await axiosJWT.get('/v1/user', {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });
    dispath(getUsersSuccess(res.data));
  } catch (error) {
    dispath(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispath, id, axiosJWT) => {
  dispath(deleteUserStart());
  try {
    const res = await axiosJWT.delete(`/v1/user/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });
    dispath(deleteUserSuccess(res.data));
  } catch (error) {
    dispath(deleteUsersFailed(error?.response?.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post('/v1/auth/logout', id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(logOutFailed());
  }
};