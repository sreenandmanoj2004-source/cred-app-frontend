import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🔐 Check conditional login state directly from storage
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000
    });
  };

  return (
    <>
      <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Brand/Logo Link */}
        <div onClick={() => navigate('/')} style={styles.brand}>
          <span style={styles.logoIcon}>⚡</span> VeloTrack Hub
        </div>

        {/* Menu Controls */}
        <div style={styles.linksMenu}>
          <span 
            onClick={() => navigate('/')} 
            style={{...styles.link, color: location.pathname === '/' ? '#38bdf8' : '#9ca3af'}}
          >
            Home
          </span>

          {/* 🌟 Task #2 Logic: Show items conditionally based on authentication status */}
          {token ? (
            <>
              <span 
                onClick={() => navigate('/dashboard')} 
                style={{...styles.link, color: location.pathname === '/dashboard' ? '#38bdf8' : '#9ca3af'}}
              >
                Dashboard
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <span 
                onClick={() => navigate('/login')} 
                style={{...styles.link, color: location.pathname === '/login' ? '#38bdf8' : '#9ca3af'}}
              >
                Login
              </span>
              <button 
                onClick={() => navigate('/signup')} 
                style={styles.signupBtn}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  </>
    
  );
};

const styles = {
  navbar: {
    height: '60px',
    backgroundColor: '#111827',
    borderBottom: '1px solid #1f2937',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: '"Inter", sans-serif'
  },
  navContainer: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  brand: {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logoIcon: {
    color: '#3b82f6'
  },
  linksMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  link: {
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  signupBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  logoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default Navbar;