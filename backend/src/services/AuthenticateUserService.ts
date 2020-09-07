import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

const keyTemporary =
  '799c8111e78912b92795714ef1ef97f100e3792a221fedec59e097ba930dba0b';

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination!');
    }

    // depois deve configurar o models do user para sempre retornar string
    const passwordUser = user.password || '';

    const passwordMatched = await compare(password, passwordUser);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination!');
    }

    const token = sign({}, keyTemporary, { subject: user.id, expiresIn: '1d' });

    return { user, token };
  }
}

export default AuthenticateUserService;
