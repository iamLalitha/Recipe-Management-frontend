import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/send-verification-email`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please check your email and try again.');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className='card x-auto class' style={{width:'600px'}}> 
    <div className='card-body'>
      <h2 className='card-title'>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Email:</label>
          <input type="email"
          className='form-control'
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <button type="submit" className='btn-btn-danger'>Reset Password</button>
        </div>
      </form>
      <p>{message}</p>
     
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
