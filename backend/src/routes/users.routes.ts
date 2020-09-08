import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload';

import CreateUserservice from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

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

// patch é usado geralmente para modificar uma informação da entidade em especifico
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      return res.json({ test: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
