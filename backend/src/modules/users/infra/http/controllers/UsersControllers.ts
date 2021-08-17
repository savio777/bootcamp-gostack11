import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserservice from '../../../services/CreateUserService';

class UsersControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserservice = container.resolve(CreateUserservice);

    const user = await createUserservice.execute({ name, email, password });

    return res.json(user);
  }
}

export default UsersControllers;
