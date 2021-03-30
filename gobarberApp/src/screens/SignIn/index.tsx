import React from 'react';

import { Image } from 'react-native';

import { Container, Title } from './styles';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logo} width={100} height={50} />

    <Title>Faça seu login</Title>
  </Container>
);

export default SignIn;
