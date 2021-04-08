import React, { useCallback, useRef } from 'react';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>();

  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image
              source={logo}
              width={100}
              height={50}
              style={{ marginTop: -30 }}
            />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input name="name" placeholder="Name" icon="user" />
              <Input name="email" placeholder="Email" icon="mail" />
              <Input name="password" placeholder="Senha" icon="lock" />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
