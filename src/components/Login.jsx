import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const resData = await response.json();

      if (response.ok && resData.success) {
        // 🌟 ALIGNED WITH BACKEND: Save properties using correct object layout
        localStorage.setItem("token", resData.accessToken); 
        localStorage.setItem("role", resData.data.role.toLowerCase().trim());
        
        toast.success("🔓 Welcome back! Secure link established.", {
          position: 'top-right',
          autoClose: 3000
        });
        navigate('/dashboard');
      } else {
        // 🌟 Displays the exact backend validation error (e.g. "Invalid email or password")
        toast.error(resData.message || "Authentication failed. Check your structural formatting.", {
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
        <h2 style={styles.title}>Login to Terminal</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" style={styles.submitBtn}>Authenticate</button>
        </form>
        <p style={styles.switchText}>
          New to the hub? <span onClick={() => navigate('/signup')} style={styles.link}>Create an account</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, minHeight: 'calc(100vh - 60px)', backgroundColor: '#0b0f19', fontFamily: '"Segoe UI", sans-serif', boxSizing: 'border-box' },
  card: { backgroundColor: '#111827', padding: '40px', borderRadius: '16px', border: '1px solid #1f2937', width: '100%', maxWidth: '400px', boxSizing: 'border-box', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' },
  title: { margin: '0 0 24px 0', color: '#ffffff', textAlign: 'center', fontSize: '24px', fontWeight: '700' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '12px', border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#1f2937', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' },
  submitBtn: { width: '100%', padding: '12px', color: 'white', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  switchText: { color: '#9ca3af', fontSize: '14px', textAlign: 'center', marginTop: '20px', marginBottom: 0 },
  link: { color: '#38bdf8', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }
};

export default Login;