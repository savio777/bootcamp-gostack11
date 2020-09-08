import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload';

import CreateUserservice from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserservice = new CreateUserservice();

  const user = await createUserservice.execute({ name, email, password });

  return res.json(user);
});

// patch é usado geralmente para modificar uma informação da entidade em especifico
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { user, file } = req;

    const updateUserAvatarService = new UpdateUserAvatarService();

    const userUploaded = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: file.filename,
    });

    delete userUploaded.password;

    return res.json(userUploaded);
  },
);

export default usersRouter;
