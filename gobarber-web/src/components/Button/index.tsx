import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// caso não precise adicionar nenhum prop a interface extendida
type ButtonProps = ButtonHTMLAttributes<HTMLElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
