import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/login', { username, password }).then(res => {
        toast.success(res.data.message)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate('/gettingstarted');
        }, 1500);
      }).catch(e => {
        toast.error(e.response.data.message);
      })
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="container-fluid container-md h-100 flex flex-column flex-1 justify-content-center">
      <div className="row h-100 align-items-center">
        <div className="col-md-6 d-none d-md-block  p-5">
          <div className="text-center">
            <img
              src="/login/login.png"
              alt="Vector login"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-md-6  p-3">
          <div className='shadow-sm border border-1 rounded-3 px-3 py-4'>
            <div className="text-center mb-5">
              <h1 className="text-success fw-bold">LOGIN</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mb-3">
                <button type="submit" className={"btn btn-success " + (!(password && username) ? 'disabled' : '')}>
                  Login
                </button>
              </div>
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to="/register" className='text-success'>
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;