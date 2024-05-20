import React, {useEffect} from 'react';
import './App.css';
import {ErrorProvider} from './context/errorContext'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/memorize', {replace: true})
    }
  }, [location, navigate]);

  return (
    <ErrorProvider>
      <Outlet />
    </ErrorProvider>
  )
}

export default App;
