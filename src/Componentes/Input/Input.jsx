import React from 'react';
import { Controller } from 'react-hook-form';
import './styles.css';

const Input = ({ leftIcon, name, control, placeholder, type, rules, ...rest }) => {
  return (
    <div className="input-container">
      {leftIcon && <div className="icon-container">{leftIcon}</div>}

      <Controller
        name={name}
        control={control}
        rules={rules}  // Adicione as regras de validação aqui
        render={({ field }) => (
          <input
            className='input-text'
            placeholder={placeholder}
            type={type}
            id={name}
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export { Input };
