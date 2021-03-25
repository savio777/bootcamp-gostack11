import React, {useCallback, useRef} from 'react';

import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/AuthContext';

import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container, Content, Background} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {user, signIn} = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {abortEarly: false});

        signIn({email: data.email, password: data.password});
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        // mostrar toast
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input icon={FiMail} name="email" type="email" placeholder="Email" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forget">Esqueci minha senha</a>
        </Form>
        <a href="#">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
