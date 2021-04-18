import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './shared/routes';
import uploadConfig from './configs/upload';
import ensureAuthenticated from './shared/middlewares/ensureAuthenticated';
import AppError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', ensureAuthenticated, express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // verificar se o erro é da instancia AppError (erro tratado por mim)
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log('err~> ', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server init on 3333🌊');
});
