import React from 'react';

export const GeometricBackground: React.FC = () => {
  return (
    <div className="bauhaus-bg-container">
      {/* Grid Lines */}
      <div className="shape-h-line" style={{ top: '20%' }}></div>
      <div className="shape-h-line" style={{ top: '50%' }}></div>
      <div className="shape-h-line" style={{ top: '80%' }}></div>
      <div className="shape-v-line" style={{ left: '15%' }}></div>
      <div className="shape-v-line" style={{ left: '45%' }}></div>
      <div className="shape-v-line" style={{ left: '75%' }}></div>

      {/* Geometric Shapes */}
      <div className="shape shape-circle" style={{ animation: 'float 20s infinite alternate linear' }}></div>
      <div className="shape shape-square" style={{ animation: 'float 25s infinite alternate-reverse linear', animationDelay: '-5s' }}></div>
      <div className="shape shape-triangle" style={{ animation: 'float 18s infinite alternate linear', animationDelay: '-10s' }}></div>
      
      {/* Dot Patterns */}
      <div className="dot-pattern" style={{ top: '10%', left: '10%', animation: 'pulse 10s infinite alternate' }}></div>
      <div className="dot-pattern" style={{ bottom: '20%', right: '5%', width: '150px', height: '150px', animation: 'pulse 12s infinite alternate-reverse' }}></div>

      {/* Bauhaus Frame */}
      <div className="bauhaus-frame"></div>

      {/* Decorative lines / Small accents */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '100px',
        height: '100px',
        border: '10px solid var(--secondary)',
        opacity: 0.1,
        borderRadius: '50%',
        animation: 'float 15s infinite alternate ease-in-out'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '20%',
        width: '60px',
        height: '60px',
        border: '15px solid var(--primary)',
        opacity: 0.1,
        animation: 'float 22s infinite alternate-reverse ease-in-out'
      }}></div>

      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 40px) rotate(5deg); }
          100% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes pulse {
          0% { opacity: 0.05; }
          100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};
