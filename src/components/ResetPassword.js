import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ResetPassword() {
 // const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password/:token`, { newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
   <div className='d-flex justify-content-center align-items-center'>
    <div className='card x-auto class' style={{width:'600px'}}> 
     <div className='card-body'>
      <h2 className='card-title'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input type="password" 
          className='form-control'
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <button type="submit" className='btn-btn-danger'>Submit</button>
        </div>
      </form>
      <p>{message}</p>
      <p>
        <button onClick={()=> navigate('/login')}>Back to Login</button>
      </p>
    </div>
    </div>
    </div>
  );
}

export default ResetPassword;
