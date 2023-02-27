import supertest from 'supertest';
import app from '../..';
import { DEFAULT_USER, OTHER_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const usersEndpointsSpecs = () => {
	describe('├─── Users Endpoints Suite', () => {
		it('POST (/users/register) --> 201 Created - [Create New User]', async () => {
			await req.post('/users/register').send(DEFAULT_USER);

			const res = await req.post('/users/register').send(OTHER_USER);

			expect(res.statusCode).toBe(201);
		});

		let token: string = 'Bearer ';

		it('POST (/users/login) --> 202 Accepted - [Authenticate Specific User]', async () => {
			const res = await req.post('/users/login').send(OTHER_USER);

			token += res.body.user.token;

			expect(res.statusCode).toBe(202);
		});

		it('GET (/users/:userID) --> 200 Ok - [Show Specific User]', async () => {
			const res = await req
				.get(`/users/${OTHER_USER.id}`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});

		it('GET (/users) --> 200 Ok - [Show All Users]', async () => {
			const res = await req.get('/users').set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});

		it('PUT (/users/:userID) --> 200 Ok - [Update Specific User]', async () => {
			const res = await req
				.put(`/users/${OTHER_USER.id}`)
				.set('Authorization', token)
				.send(OTHER_USER);

			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/users/:userID) --> 200 Ok - [Delete Specific User]', async () => {
			const res = await req
				.delete(`/users/${OTHER_USER.id}`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});
	});
};
