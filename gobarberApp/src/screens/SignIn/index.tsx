import React from 'react';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => (
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
            <Title>Faça seu login</Title>
          </View>
          <Input name="email" placeholder="Email" icon="mail" />
          <Input name="password" placeholder="Senha" icon="lock" />
          <Button onPress={() => {}}>Entrar</Button>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>

    <CreateAccountButton onPress={() => {}}>
      <Icon name="log-in" size={20} color="#ff9000" />
      <CreateAccountText>Criar conta</CreateAccountText>
    </CreateAccountButton>
  </>
);

export default SignIn;
