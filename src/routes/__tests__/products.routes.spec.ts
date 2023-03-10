import supertest from 'supertest';
import app from '../..';
import {
	DEFAULT_PRODUCT,
	OTHER_PRODUCT,
} from '../../constants/product.type.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const productsEndpointsSpecs = () => {
	describe('├─── Products Endpoints Suite', () => {
		let token: string = 'Bearer ';
		beforeAll(async () => {
			const resUser = await req.post('/users/login').send(DEFAULT_USER);
			token += resUser.body.user.token;
		});

		it('POST (/products/create) --> 201 Created - [Create New Product]', async () => {
			await req
				.post('/products/create')
				.send(DEFAULT_PRODUCT)
				.set('Authorization', token);

			const res = await req
				.post('/products/create')
				.send(OTHER_PRODUCT)
				.set('Authorization', token);

			expect(res.statusCode).toBe(201);
		});

		it('GET (/products/:productID) --> 200 Ok - [Show Specific Product]', async () => {
			const res = await req
				.get(`/products/${OTHER_PRODUCT.id}`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});

		it('GET (/products) --> 200 Ok - [Show All Products]', async () => {
			const res = await req.get('/products').set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/products/:productID) --> 200 Ok - [Update Specific Product]', async () => {
			const res = await req
				.put(`/products/${OTHER_PRODUCT.id}`)
				.set('Authorization', token)
				.send(OTHER_PRODUCT);

			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/:productID) --> 200 Ok - [Delete Specific Product]', async () => {
			const res = await req
				.delete(`/products/${OTHER_PRODUCT.id}`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});
	});
};
