import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../configs/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // const user = await userRepository.findOne({ where: { id: user_id } });
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      // deletar avatar já salvo

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
