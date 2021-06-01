import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (_, res) => {
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json({ appointment });
});

export default appointmentsRouter;
