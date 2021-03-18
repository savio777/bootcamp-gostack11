import {ValidationError} from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(error: ValidationError): Errors {
  const valodationErrors: Errors = {};

  // path: nome do campo do input
  // message: erro da mensagem
  error.inner.forEach(err => {
    if (err.path) valodationErrors[err?.path] = err.message;
  });

  return valodationErrors;
}
