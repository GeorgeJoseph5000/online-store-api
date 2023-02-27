import express, { Application, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import mainRoute from '../routes';

const app: Application = express();

app.use(
	cors(), 
	json(), 
	helmet(),
	morgan('dev', {
		skip: () => {
			return process.env.NODE_ENV === 'test';
		},
	})
);

app.use('/', mainRoute);

export default app;
