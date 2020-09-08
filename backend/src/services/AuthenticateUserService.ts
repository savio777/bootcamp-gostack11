import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import authConfig from '../configs/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    // depois deve configurar o models do user para sempre retornar string
    const passwordUser = user.password || '';

    const passwordMatched = await compare(password, passwordUser);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const { secret, expireIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expireIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
