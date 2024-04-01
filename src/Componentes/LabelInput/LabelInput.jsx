import React from 'react';
import './styles.css';

const LabelInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${label.toLowerCase()}`}
      />
    </div>
  );
};

export default LabelInput