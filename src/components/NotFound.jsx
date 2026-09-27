import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.contentCard}>
        {/* Error Code Accent */}
        <div style={styles.errorCode}>404</div>
        
        {/* Warning Indicator */}
        <div style={styles.statusBadge}>
          <span style={styles.pulseDot}></span>
          <span>SYSTEM ERROR: LINK RESOLUTION FAILED</span>
        </div>

        <h1 style={styles.title}>Requested Asset Not Found</h1>
        <p style={styles.description}>
          The tracking sequence or index stream you are attempting to look up does not exist 
          or has been permanently purged from the terminal registry database.
        </p>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => navigate(-1)} 
            style={styles.secondaryBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#374151';
            }}
          >
            ← Step Back
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')} 
            style={styles.primaryBtn}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Return to Terminal Hub
          </button>
        </div>
      </div>
    </div>
  );
};

// 🌌 Cohesive Dark Cyber Styles Matching Your Ecosystem Layouts
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0b0f19',
    color: '#f1f5f9',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    padding: '20px',
    boxSizing: 'border-box'
  },
  contentCard: {
    backgroundColor: '#111827',
    padding: '50px 40px',
    borderRadius: '20px',
    border: '1px solid #1f2937',
    maxWidth: '560px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    boxSizing: 'border-box'
  },
  errorCode: {
    fontSize: '96px',
    fontWeight: '900',
    color: 'transparent',
    backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    letterSpacing: '-2px',
    lineHeight: '1',
    marginBottom: '16px'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginBottom: '24px'
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse 2s infinite'
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 0 14px 0',
    letterSpacing: '-0.5px'
  },
  description: {
    color: '#9ca3af',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 32px 0'
  },
  buttonGroup: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryBtn: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    transition: 'background-color 0.2s ease'
  },
  secondaryBtn: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    border: '1px solid #374151',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default NotFound;