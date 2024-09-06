import React from 'react';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    width: '100%',
    zIndex: 1000,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 340ms linear infinite',
  },
  text: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#555',
  },
};

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading editor...</p>
    </div>
  );
};

export default Loading;
