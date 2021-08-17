import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserservice from '../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

class UsersControllers {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserservice = container.resolve(CreateUserservice);

    const user = await createUserservice.execute({ name, email, password });

    return res.json(user);
  }

  public async updateAvatar(req: Request, res: Response) {
    const { user, file } = req;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const userUploaded = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: file.filename,
    });

    delete userUploaded.password;

    return res.json(userUploaded);
  }
}

export default UsersControllers;
