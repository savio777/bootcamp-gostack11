import React, { useCallback, useRef } from 'react';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationError';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

import logo from '../../assets/logo.png';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      Alert.alert('Cadastro realizado', 'Você já pode fazer o seu login');
      /*addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer o seu login',
      });*/

      navigation.goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente',
      );
      /*addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
      });*/
    }
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
              <Input
                name="name"
                placeholder="Name"
                icon="user"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
              />
              <Input
                ref={emailRef}
                name="email"
                placeholder="Email"
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />
              <Input
                ref={passwordRef}
                name="password"
                placeholder="Senha"
                icon="lock"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
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
