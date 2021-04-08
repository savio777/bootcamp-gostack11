import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useField } from '@unform/core';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { icon, name, ...rest },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // passar informação do componente filho para o componente pai
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

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
    <Container isFocused={isFocused} isErrored={!!error}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />
      )}

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...rest}
      />

      {error && <Icon name="alert-circle" size={20} color="#c53030" />}
    </Container>
  );
};

export default forwardRef(Input);
