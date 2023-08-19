import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    axios.post(`${API_BASE_URL}/login`, userCredentials)  
      .then(response => {
        console.log('Login successful:', response.data, response.data.userid);
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('userid',response.data.userid)
        login(response.data.user)
        navigate('/recipes'); 
      })
      .catch(error => {
        console.error('Login error:', error);
        
      });
  };

  return (
    <div className='card mx-auto class' style={{width:'600px'}}>
      <div className='card-body'>
      <h2 className='card-title'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Login</button>
      </form>
      <div>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
