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
  text: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#555',
  },
};

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.text}>Loading editor...</p>
    </div>
  );
};

export default Loading;
