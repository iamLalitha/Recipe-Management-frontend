import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
