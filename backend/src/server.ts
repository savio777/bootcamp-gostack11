import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './configs/upload';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

import './database';

const app = express();

app.use(express.json());

app.use('/files', ensureAuthenticated, express.static(uploadConfig.directory));
app.use(routes);

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server init on 3333🌊');
});
