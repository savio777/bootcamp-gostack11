import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// caso não precise adicionar nenhum prop a interface extendida
type ButtonProps = ButtonHTMLAttributes<HTMLElement>;

const Button: React.FC<ButtonProps> = (props, { children }) => (
  <Container>
    <button type="button" {...props}>
      {children}
    </button>
  </Container>
);

export default Button;
