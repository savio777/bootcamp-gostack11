import React, { useEffect, useRef } from 'react';

import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // para poder setar valor no input de maneira automatica por via de codigo
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      // limpar o valor no input de maneira automatica por via de codigo
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current?.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      {icon && <Icon name={icon} size={20} color="#666360" />}

      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};
export default Input;
