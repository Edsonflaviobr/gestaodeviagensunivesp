import React from 'react';
import './styles.css';

const Button = ({ title }) => {
  return (
    <>
      <button>{title}</button>
    </>
  );
}

export { Button };



// import React from 'react'

// import { ButtonContainer } from './styles';

// const Button = ( {title, variant = "primary", onClick} ) => {
//   return (
//     <ButtonContainer variant={variant} onClick={onClick}> {title} </ButtonContainer>
//   )
// }

// export { Button }
