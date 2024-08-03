import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { RootState } from '../redux/reducers/rootReducer';


interface HeaderProps {
  title?: string;
}

const AppHeader: React.FC<HeaderProps> = ({ title = 'Welcome' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = useCallback(() => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      removeToken();
      dispatch(logout());
      navigate('/signin');
    }
  }, [dispatch, navigate]);

  return (
    <header className='app-header'>
    <div className='nav-container'>
      <h1 className='app-logo'>Welcome {user?.name}</h1>
      <nav className='app-nav'>
        <a href="/" className='nav-link'>Home</a>
        <a href="/" onClick={handleLogout} className='nav-link'>Logout</a>
      </nav>
    </div>
  </header>
  );
};

export default React.memo(AppHeader);
