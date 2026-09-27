import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = {
    1: {
      title: "📦 Step 1: Streamlined Asset Index",
      description: "Welcome to VeloTrack. Your dashboard displays an ultra-clean layout showing ONLY product names. This prevents visual clutter in your monitoring terminal."
    },
    2: {
      title: "🔍 Step 2: Telemetry Deep-Dive",
      description: "Need details? Simply click anywhere on a product card to expand a high-fidelity telemetry log revealing full specifications and active valuation pricing."
    },
    3: {
      title: "🔐 Step 3: Multi-Role Controls",
      description: "Depending on your node profile (Admin vs User), management tools to publish, modify, or permanently purge assets will dynamically adjust."
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    onComplete();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Step Counter Indicator */}
        <div style={styles.header}>
          <span style={styles.stepBadge}>Sequence {currentStep} / 3</span>
          {currentStep < 3 && (
            <button onClick={handleFinish} style={styles.skipBtn}>
              Skip Overview ✕
            </button>
          )}
        </div>

        {/* Dynamic Step Content */}
        <div style={styles.body}>
          <h2 style={styles.title}>{steps[currentStep].title}</h2>
          <p style={styles.desc}>{steps[currentStep].description}</p>
        </div>

        {/* Progress Progress Indicators */}
        <div style={styles.dotContainer}>
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot} 
              style={{
                ...styles.dot, 
                backgroundColor: currentStep === dot ? '#2563eb' : '#374151',
                width: currentStep === dot ? '24px' : '8px'
              }}
            />
          ))}
        </div>

        {/* Navigation Action */}
        <button onClick={handleNext} style={styles.nextBtn}>
          {currentStep === 3 ? "Initialize Terminal" : "Next Parameter →"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' },
  card: { backgroundColor: '#111827', width: '100%', maxWidth: '460px', borderRadius: '20px', border: '1px solid #1f2937', padding: '32px', boxSizing: 'border-box', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  stepBadge: { backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' },
  skipBtn: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', fontWeight: '500' },
  body: { minHeight: '120px' },
  title: { color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0', letterSpacing: '-0.3px' },
  desc: { color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', margin: 0 },
  dotContainer: { display: 'flex', gap: '6px', margin: '24px 0', alignItems: 'center' },
  dot: { height: '8px', borderRadius: '4px', transition: 'all 0.3s ease' },
  nextBtn: { padding: '12px', color: 'white', backgroundColor: '#2563eb', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }
};

export default Onboarding;