import { Router } from 'express';

import UsersRepository from '../../typeorm/repositories/UsersRepository';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
