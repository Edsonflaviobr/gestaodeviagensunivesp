import React from 'react';

const LabelInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Informe o ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default LabelInput