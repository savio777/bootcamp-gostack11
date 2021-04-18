import { Router } from 'express';

import appointments from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import sessions from '../../../../modules/users/infra/http/routes/sessions.routes';
import users from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/sessions', sessions);
routes.use('/users', users);
routes.use('/appointments', appointments);

export default routes;
