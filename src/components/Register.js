import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; 
import { API_BASE_URL } from '../config'; 
import { useAuth } from '../authContext';

function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const[username, setUsername] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const savedRecipes = []

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      savedRecipes
    };

    axios.post(`${API_BASE_URL}/register`, newUser)  
      .then(response => {
        console.log('Registration successful:', response.data);
        login(response.data.user);
        navigate('/login'); 
      })
      .catch(error => {
        console.error('Registration error:', error);
        // Handle registration error
      });
  };

  return (
    <div className='card mx-auto class' style={{width:'600px'}}>
      <div className='card-body'>
      <h2 className='card-title'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Username:</label>
       <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="form-control"
    required
  />
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
        <button type="submit" className="btn btn-danger">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
