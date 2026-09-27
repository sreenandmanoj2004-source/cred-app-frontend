import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div style={styles.container}>
      {/* Ambient background glow */}
      <div style={styles.glowEffect}></div>

      <div style={styles.heroCard}>
        <div style={styles.badge}>🚀 VERSION 2.0 LIVE</div>
        <h1 style={styles.mainTitle}>
          Welcome to <span style={styles.accentText}>VeloTrack Hub</span>
        </h1>
        <p style={styles.subtitle}>
          The next-generation terminal for real-time asset telemetry management, 
          streamlined inventory indexes, and secure multi-role tracking pipelines.
        </p>

        <div style={styles.btnGroup}>
          {token ? (
            <button 
              onClick={() => navigate('/dashboard')} 
              style={styles.primaryBtn}
            >
              Enter Dashboard Terminal →
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')} 
                style={styles.primaryBtn}
              >
                Access Account
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                style={styles.secondaryBtn}
              >
                Register Node
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#0b0f19',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box'
  },
  glowEffect: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(0,0,0,0) 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1
  },
  heroCard: {
    backgroundColor: '#111827',
    border: '1px solid #1f2937',
    padding: '60px 40px',
    borderRadius: '24px',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    boxSizing: 'border-box'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    color: '#3b82f6',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '24px'
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: '42px',
    fontWeight: '800',
    margin: '0 0 16px 0',
    letterSpacing: '-1px',
    lineHeight: '1.2'
  },
  accentText: {
    color: '#38bdf8',
    backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 40px 0',
    maxWidth: '560px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  btnGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    padding: '14px 32px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
    transition: 'transform 0.2s'
  },
  secondaryBtn: {
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: '#f1f5f9',
    border: '1px solid #374151',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default Home;