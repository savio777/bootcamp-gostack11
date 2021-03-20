import React from 'react';

import {Container} from './styles';

interface TooltipProps {
  title: string;
  className?: string; // por ser manipulado pelo styled components em outro componente
}

const Tooltip: React.FC<TooltipProps> = ({title, className, children}) => (
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);

export default Tooltip;
