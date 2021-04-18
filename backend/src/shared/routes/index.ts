import { Router } from 'express';

import appointments from './appointments.routes';
import sessions from './sessions.routes';
import users from './users.routes';

const routes = Router();

routes.use('/sessions', sessions);
routes.use('/users', users);
routes.use('/appointments', appointments);

export default routes;
