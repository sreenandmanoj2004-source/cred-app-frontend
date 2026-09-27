import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      
      const resData = await response.json();

      if (response.ok && resData.success) {
        // 🎉 TASK #5 COMPLETE: Automatically authorize the user using registration response tokens
        localStorage.setItem("token", resData.accessToken);
        localStorage.setItem("role", resData.data.role.toLowerCase().trim());

        toast.success(`✨ Account provisioned successfully! Welcome, ${resData.data.firstName}.`, {
          position: 'top-right',
          autoClose: 4000
        });
        
        // Instant pass-through bypasses login page completely
        navigate('/dashboard');
      } else {
        toast.error(resData.message || "Registration rejected. Structural validation failed.", {
          position: 'top-right',
          autoClose: 5000
        });
      }
    } catch (error) {
      toast.error("Failed to connect to the authentication server.", {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register Node Terminal</h2>
        <form onSubmit={handleSignup}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                style={styles.input}
                placeholder="John"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                style={styles.input}
                placeholder="Doe"
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input}
              placeholder="name@domain.com"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" style={styles.submitBtn}>Initialize Secure Account</button>
        </form>
        <p style={styles.switchText}>
          Already registered? <span onClick={() => navigate('/login')} style={styles.link}>Authenticate here</span>
        </p>
      </div>
    </div>
  );
};

// Sleek dark ecosystem theme styles matching your Login box design
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, minHeight: 'calc(100vh - 60px)', backgroundColor: '#0b0f19', fontFamily: '"Segoe UI", sans-serif', boxSizing: 'border-box', padding: '20px' },
  card: { backgroundColor: '#111827', padding: '40px', borderRadius: '16px', border: '1px solid #1f2937', width: '100%', maxWidth: '460px', boxSizing: 'border-box', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' },
  title: { margin: '0 0 24px 0', color: '#ffffff', textAlign: 'center', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' },
  row: { display: 'flex', gap: '16px' },
  inputGroup: { marginBottom: '20px', flex: 1 },
  label: { display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#1f2937', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' },
  submitBtn: { width: '100%', padding: '12px', color: 'white', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' },
  switchText: { color: '#9ca3af', fontSize: '14px', textAlign: 'center', marginTop: '20px', marginBottom: 0 },
  link: { color: '#38bdf8', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }
};

export default Signup;