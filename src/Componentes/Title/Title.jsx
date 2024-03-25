import React from 'react';
import './styles.css';

const Title = ({ title, color }) => {
  const titleStyle = {
    color: color || '#ffffff',
  };

  return (
    <>
      <h2 style={titleStyle}>{title}</h2>
    </>
  );
}

export { Title };