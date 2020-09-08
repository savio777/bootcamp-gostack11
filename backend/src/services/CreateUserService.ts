import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('this email already used');
    }

    const hashPassword = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
