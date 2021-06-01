import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import authConfig from '../../../configs/auth';
import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IAuthenticateUserDTO from '../dtos/IAuthenticateUserDTO';
import IAuthenticateUserResponseDTO from '../dtos/IAuthenticateUserResponseDTO';

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

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
