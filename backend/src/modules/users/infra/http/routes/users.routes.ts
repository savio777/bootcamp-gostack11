import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../configs/upload';
import UsersControllers from '../controllers/UsersControllers';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControllers = new UsersControllers();

const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);

// patch é usado geralmente para modificar uma informação da entidade em especifico
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersControllers.updateAvatar,
);

export default usersRouter;
