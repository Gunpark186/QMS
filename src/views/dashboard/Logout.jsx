import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm('Are you sure you want to exit?');

    if (confirmLogout) {
      
      navigate('/pages/login', { replace: true }); 
    } else {
      navigate(-1); 
    }
  }, [navigate]);

  return null;
}
