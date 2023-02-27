import { PoolClient } from 'pg';
import pool from '../../database';
import supertest from 'supertest';
import app from '../..';
import { dashboardEndpointsSpecs } from './dashboard.routes.spec';
import { orderProductsEndpointsSpecs } from './orderProducts.routes.spec';
import { ordersEndpointsSpecs } from './orders.routes.spec';
import { productsEndpointsSpecs } from './products.routes.spec';
import { usersEndpointsSpecs } from './users.routes.spec';

const req = supertest(app);

describe('├─── Server Endpoints Suites', () => {
	describe('├─── Main Endpoint Suite', () => {
		it('GET (/) - 404 Not Found', async () => {
			const res = await req.get('/');
			expect(res.statusCode).toBe(404);
		});
	});

	usersEndpointsSpecs();

	productsEndpointsSpecs();

	ordersEndpointsSpecs();

	orderProductsEndpointsSpecs();

	dashboardEndpointsSpecs();

	afterAll(async () => {
		const client: PoolClient = await pool.connect();
		await client.query('DELETE FROM order_products');
		await client.query('DELETE FROM orders');
		await client.query('DELETE FROM products');
		await client.query('DELETE FROM users');
		client.release();
	});
});
