import React from 'react';

import {
  FiArrowLeft, FiMail, FiLock, FiUser,
} from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />
      <form>
        <h1>Faça seu cadastro</h1>
        <Input icon={FiUser} name="name" type="text" placeholder="Email" />
        <Input icon={FiMail} name="email" type="email" placeholder="Email" />
        <Input icon={FiLock} name="pass" type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        <a href="forget">Esqueci minha senha</a>
      </form>
      <a href="#">
        <FiArrowLeft />
        Voltar para login
      </a>
    </Content>
  </Container>
);

export default SignUp;
