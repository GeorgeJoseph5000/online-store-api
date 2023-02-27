import { DEFAULT_PRODUCT } from './../../constants/product.type.constant';
import { DEFAULT_ORDER } from './../../constants/order.type.constant';
import supertest from 'supertest';
import app from '../..';
import {
	DEFAULT_ORDER_PRODUCT,
	OTHER_ORDER_PRODUCT,
} from '../../constants/orderProduct.type.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const orderProductsEndpointsSpecs = () => {
	describe('├─── OrderProducts Endpoints Suite', () => {
		let token: string = 'Bearer ';
		beforeAll(async () => {
			const resUser = await req.post('/users/login').send(DEFAULT_USER);
			token += resUser.body.user.token;
		});

		it('POST (/orders/:orderID/add) - 200 Ok - [Add New Product Into Order]', async () => {
			await req
				.post(`/orders/${DEFAULT_ORDER.id}/add`)
				.set('Authorization', token)
				.send(DEFAULT_ORDER_PRODUCT);

			const res = await req
				.post(`/orders/${DEFAULT_ORDER.id}/add`)
				.set('Authorization', token)
				.send(OTHER_ORDER_PRODUCT);

			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/:productID) --> 200 Ok - [Show Specific Product Within Order]', async () => {
			const res = await req
				.get(`/orders/${DEFAULT_ORDER.id}/${DEFAULT_PRODUCT.id}`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products) --> 200 Ok - [Show All Products Within Order]', async () => {
			const res = await req
				.get(`/orders/${DEFAULT_ORDER.id}/products`)
				.set('Authorization', token);

			expect(res.statusCode).toBe(200);
		});
	});
};
