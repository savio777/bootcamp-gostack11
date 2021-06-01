import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../configs/upload';
import AppError from '../../../shared/errors/AppError';

import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

class UpdateUserAvatarService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IUpdateUserDTO): Promise<User> {
    // const user = await this.userRepository.findOne({ where: { id: user_id } });
    const user = await this.userRepository.findById(user_id);

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

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
