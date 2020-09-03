import { Router } from 'express';

import appointments from './appointments.routes'

const routes = Router();

routes.post('/users', (req, res) => {
  const { name, email } = req.body;

  const user = { name, email };

  return res.json({ user });
});

routes.use('/appointments', appointments)

export default routes;
