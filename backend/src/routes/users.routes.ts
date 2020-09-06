import { Router } from 'express';

import CreateUserservice from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserservice = new CreateUserservice();

    const user = await createUserservice.execute({ name, email, password });

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
