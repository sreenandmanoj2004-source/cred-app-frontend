import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Onboarding from './Onboarding';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  // State to manage the active selection for our item overview popup
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/products`;
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'admin'; 

  useEffect(() => {
    if (!token) {
      toast.warning('Session expired. Please log in.', {
        position: 'top-right',
        autoClose: 4000
      });
      if (onLogout) onLogout();
      navigate('/login');
    }
  }, [navigate, onLogout, token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setCurrentPage(1); // Reset to first page when fetching products
      }
    } catch (error) {
      toast.error('Failed to connect to VeloTrack index streams.', {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  // 🔌 Modified Initiation Check: Trigger walkthrough if key does not exist
  useEffect(() => {
    if (token) {
      fetchProducts();
      const hasSeen = localStorage.getItem("hasSeenOnboarding");
      if (!hasSeen) {
        setShowOnboarding(true);
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price: Number(price), description };
    const url = editingId ? `${API_BASE_URL}/${editingId}` : API_BASE_URL;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      if (data.success) {
        if (editingId) {
          toast.success('⚡ Asset telemetry updated successfully!', {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('📦 New product logged to hub terminal!', {
            position: 'top-right',
            autoClose: 3000
          });
        }
        
        // Clean text fields safely on verified success
        setName(''); 
        setPrice(''); 
        setDescription(''); 
        setEditingId(null);
        
        fetchProducts();
      } else {
        toast.error(data.message || 'Operation rejected by terminal firewall', {
          position: 'top-right',
          autoClose: 5000
        });
      }
    } catch (error) {
      toast.error('Server tracking error. Please try again.', {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  const performDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('🔥 Asset permanently deleted from terminal.', {
          position: 'top-right',
          autoClose: 3000
        });
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to remove asset', {
          position: 'top-right',
          autoClose: 5000
        });
      }
    } catch (error) {
      toast.error('Failed to execute delete operation', {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  const handleDelete = (product, e) => {
    e.stopPropagation();
    const productId = product._id || product.id;
    if (!productId) {
      toast.error('Unable to delete: missing product ID.', {
        position: 'top-right',
        autoClose: 5000
      });
      return;
    }
    const toastId = `confirm-delete-${productId}`;
    let isConfirmed = false;

    const toastContent = (
      <div style={styles.toastContent}>
        <p style={styles.toastMessage}>
          Delete <strong>{product.name || 'this asset'}</strong>?
        </p>
        <p style={styles.toastSubtext}>
          Mark the checkbox and confirm to remove this asset permanently.
        </p>
        <label style={styles.toastCheckboxLabel}>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={(event) => { isConfirmed = event.target.checked; }}
            style={styles.toastCheckbox}
          />
          I understand this action cannot be undone.
        </label>
        <div style={styles.toastActions}>
          <button
            style={styles.toastCancelBtn}
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </button>
          <button
            style={styles.toastConfirmBtn}
            onClick={async () => {
              if (!isConfirmed) {
                toast.warn('Please check the box to confirm deletion.', {
                  position: 'top-center',
                  autoClose: 3000
                });
                return;
              }
              toast.dismiss(toastId);
              await performDelete(productId);
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    );

    toast.info(toastContent, {
      toastId,
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true,
      position: 'top-center',
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    });
  };

  const handleEditClick = (product, e) => {
    e.stopPropagation(); // Stops card layout click handles from firing popup windows concurrently
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  // 🌟 Clean account termination routine providing native pop-up tracking callback
  const handleSignOut = () => {
    if (onLogout) onLogout();
    toast.success('👋 Logged out successfully. Terminal session closed.', {
      position: 'top-right',
      autoClose: 3000
    });
    navigate('/login');
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.titleSection}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={styles.logoIcon}>📦</span>
          <h1 style={styles.headerTitle}>Product Logs</h1>
        </div>
        <button onClick={handleSignOut} style={styles.signOutBtn}>
          Disconnect Session
        </button>
      </div>

      <div style={{...styles.mainContent, gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr'}}>
        {isAdmin && (
          <div style={styles.formSection}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{editingId ? '⚡ Edit Product' : '➕ Add New Product'}</h2>
              <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Name</label>
                  <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Price (₹)</label>
                  <input type="number" placeholder="e.g. 15999" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description Telemetry</label>
                  <textarea placeholder="Specify specifications" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
                </div>
                <button type="submit" style={styles.submitBtn}>
                  {editingId ? 'Execute Update' : 'Add Product'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setName(''); setPrice(''); setDescription(''); }} style={styles.cancelBtn}>
                    Abort Action
                  </button>
                )}
              </form>
            </div>
          </div>
        )}

        <div style={styles.inventorySection}>
          <h2 style={styles.sectionTitle}>List of Products ({products.length})</h2>
          {products.length === 0 ? (
            <div style={styles.noProducts}>Hub Empty. Awaiting payload records...</div>
          ) : (
            <div style={styles.listContent}>
              <div style={styles.productGrid}>
                {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
                  <div 
                    key={product._id} 
                    style={styles.productCard}
                    onClick={() => setSelectedProduct(product)} 
                  >
                    <div style={styles.productInfo}>
                      <h3 style={styles.prodName}>{product.name}</h3>
                    </div>
                    {isAdmin && (
                      <div style={styles.cardActions}>
                        <button onClick={(e) => handleEditClick(product, e)} style={styles.editBtn}>Modify</button>
                        <button onClick={(e) => handleDelete(product, e)} style={styles.deleteBtn}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* PAGINATION CONTROLS */}
              {Math.ceil(products.length / productsPerPage) > 1 && (
                <div style={styles.paginationContainer}>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{...styles.paginationBtn, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}
                  >
                    ← Previous
                  </button>
                  
                  <div style={styles.pageNumbersContainer}>
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          ...styles.pageNumber,
                          backgroundColor: currentPage === page ? '#2563eb' : '#334155',
                          color: currentPage === page ? '#ffffff' : '#cbd5e1'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(products.length / productsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                    style={{...styles.paginationBtn, opacity: currentPage === Math.ceil(products.length / productsPerPage) ? 0.5 : 1, cursor: currentPage === Math.ceil(products.length / productsPerPage) ? 'not-allowed' : 'pointer'}}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DETAILED POPUP MODAL SCREEN OVERLAY */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Asset Specification</h2>
              <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalMetaGroup}>
                <span style={styles.modalLabel}>Product Name:</span>
                <span style={styles.modalValue}>{selectedProduct.name}</span>
              </div>
              <div style={styles.modalMetaGroup}>
                <span style={styles.modalLabel}>Hub Valuation:</span>
                <span style={styles.modalPriceValue}>₹{selectedProduct.price}</span>
              </div>
              <div style={styles.modalMetaGroupColumn}>
                <span style={styles.modalLabel}>Telemetry Details & Description:</span>
                <p style={styles.modalDescValue}>{selectedProduct.description}</p>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.modalCloseFooterBtn} onClick={() => setSelectedProduct(null)}>
                Dismiss Terminal View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 TASK #9: AUTOMATIC PAGE INITIATION WALKTHROUGH */}
      {showOnboarding && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
};

const styles = {
  dashboardContainer: { minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '20px 0 40px 0', fontFamily: '"Segoe UI", sans-serif' },
  titleSection: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1300px', margin: '0 auto', padding: '0 40px 10px 40px' },
  logoIcon: { fontSize: '24px' },
  headerTitle: { color: '#ffffff', margin: 0, fontSize: '24px', fontWeight: '700' },
  signOutBtn: { padding: '8px 16px', backgroundColor: '#334155', color: '#f1f5f9', border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' },
  mainContent: { display: 'grid', gap: '40px', padding: '20px 40px', maxWidth: '1300px', margin: '0 auto', boxSizing: 'border-box', alignItems: 'stretch' },
  formSection: { position: 'sticky', top: '40px', height: 'fit-content' },
  card: { backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', minHeight: '500px', display: 'flex', flexDirection: 'column' },
  cardTitle: { margin: '0 0 20px 0', color: '#38bdf8', fontSize: '20px' },
  inputGroup: { marginBottom: '18px' },
  label: { display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold', textTransform: 'uppercase' },
  input: { width: '100%', padding: '12px', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#0f172a', color: '#fff' },
  textarea: { width: '100%', padding: '12px', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#0f172a', color: '#fff', height: '100px', resize: 'vertical' },
  submitBtn: { width: '100%', padding: '12px', color: 'white', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { width: '100%', padding: '10px', color: '#cbd5e1', backgroundColor: '#475569', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' },
  inventorySection: { backgroundColor: '#1e293b', padding: '35px', borderRadius: '16px', border: '1px solid #334155', minHeight: '500px', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  sectionTitle: { margin: '0 0 25px 0', color: '#ffffff', fontSize: '22px' },
  noProducts: { textAlign: 'center', color: '#64748b', marginTop: '80px' },
  listContent: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '20px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '600px', margin: '0 auto', flex: 1, alignContent: 'start' },
  productCard: { backgroundColor: '#0f172a', border: '1px solid #334155', padding: '25px 20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s ease-in-out', textAlign: 'center' },
  productInfo: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' },
  prodName: { margin: 0, color: '#ffffff', fontSize: '18px', fontWeight: '600', letterSpacing: '0.3px' },
  cardActions: { display: 'flex', gap: '10px', marginTop: '15px', width: '100%' },
  editBtn: { flex: 1, padding: '6px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  deleteBtn: { flex: 1, padding: '6px 12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  paginationContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: 'auto', flexWrap: 'wrap' },
  paginationBtn: { padding: '10px 16px', backgroundColor: '#334155', color: '#e2e8f0', border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' },
  pageNumbersContainer: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
  pageNumber: { width: '40px', height: '40px', padding: 0, border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#1e293b', width: '100%', maxWidth: '500px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #334155' },
  modalTitle: { color: '#ffffff', margin: 0, fontSize: '20px', fontWeight: '700' },
  closeBtn: { background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' },
  modalBody: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' },
  modalMetaGroup: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '12px' },
  modalMetaGroupColumn: { display: 'flex', flexDirection: 'column', gap: '8px' },
  modalLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
  modalValue: { fontSize: '16px', color: '#ffffff', fontWeight: '600' },
  modalPriceValue: { fontSize: '20px', color: '#38bdf8', fontWeight: '700' },
  modalDescValue: { fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.6', backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #334155' },
  modalFooter: { padding: '15px 24px', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #334155' },
  modalCloseFooterBtn: { padding: '10px 20px', backgroundColor: '#475569', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  toastContent: { color: '#f8fafc', backgroundColor: '#111827', padding: '18px', borderRadius: '14px', minWidth: '320px' },
  toastMessage: { margin: 0, fontWeight: 700, fontSize: '15px', color: '#ffffff' },
  toastSubtext: { margin: '10px 0 14px', fontSize: '13px', color: '#cbd5e1' },
  toastCheckboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#e2e8f0', marginBottom: '14px' },
  toastCheckbox: { width: '16px', height: '16px', accentColor: '#2563eb' },
  toastActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  toastCancelBtn: { padding: '8px 12px', backgroundColor: '#334155', color: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  toastConfirmBtn: { padding: '8px 12px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Dashboard;