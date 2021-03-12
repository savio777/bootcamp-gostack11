import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Faça seu login</h1>
        <Input icon={FiMail} name="email" type="email" placeholder="Email" />
        <Input icon={FiLock} name="pass" type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        <a href="forget">Esqueci minha senha</a>
      </form>
      <a href="#">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
