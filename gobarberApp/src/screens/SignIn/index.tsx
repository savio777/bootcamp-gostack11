import React from 'react';

import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logo} width={100} height={50} />

    <Title>Faça seu login</Title>
    <Input name="email" placeholder="Email" icon="mail" />
    <Input name="password" placeholder="Senha" icon="lock" />
    <Button onPress={() => {}}>Entrar</Button>
  </Container>
);

export default SignIn;
