import { Router } from 'express';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import AppointmentsController from '../controller/AppointmentsController';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (_, res) => {
  const appointmentsRepository = new AppointmentsRepository();

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
