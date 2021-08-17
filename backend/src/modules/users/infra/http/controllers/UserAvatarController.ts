import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
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

export default UserAvatarController;
