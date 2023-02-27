import pool from '../database';
import { PoolClient } from 'pg';
import Order from '../types/order.type';

class OrderModel {
	checkOrderExistence = async (info: string): Promise<boolean | void> => {
		try {
			const client: PoolClient = await pool.connect();

			const sql: string = 'SELECT * FROM orders WHERE id=($1)::UUID';
			const result = await client.query(sql, [info]);

			client.release();

			let isFound = false;
			if (result.rows[0]) {
				isFound = true;
			}

			return isFound;
		} catch (error) {
			console.error(
				`Order Model: Unable to check ${info}: ${
					(error as Error).message
				}`
			);
		}
	};

	checkOrderStatus = async (orderID: string): Promise<boolean | void> => {
		try {
			const client: PoolClient = await pool.connect();

			const sql: string = 'SELECT * FROM orders WHERE id=($1)::UUID';
			const result = await client.query(sql, [orderID]);

			client.release();

			return result.rows[0]['is_done'];
		} catch (error) {
			console.error(
				`Order Model: Unable to check order status ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	
	create = async (order: Order): Promise<Order | void> => {
		try {
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<
				string | boolean | number | Date | Array<string | number>
			> = [];

			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO orders (id, is_done, user_id, products_ids, products_quantities, date_time, date_time_readable) VALUES ($1::UUID, $2::BOOLEAN, $3::UUID, $4::UUID[], $5::INTEGER[], $6::TIMESTAMPTZ, $7::VARCHAR) RETURNING *';
				sentValues = [
					order.id as string,
					order.is_done,
					order.user_id as string,
					order.products_ids,
					order.products_quantities,
					order.date_time as string,
					order.date_time_readable as string,
				];
			} else {
				sql =
					'INSERT INTO orders (is_done, user_id, products_ids, products_quantities, date_time, date_time_readable) VALUES ($1::BOOLEAN, $2::UUID, $3::UUID[], $4::INTEGER[], $5::TIMESTAMPTZ, $6::VARCHAR) RETURNING *';
				sentValues = [
					order.is_done,
					order.user_id as string,
					order.products_ids,
					order.products_quantities,
					order.date_time as string,
					order.date_time_readable as string,
				];
			}

			const result = await client.query(sql, sentValues);

			for (let i = 0; i < order.products_ids.length; i++) {
				sql =
					'INSERT INTO order_products (order_id, product_id, product_quantity, date_time, date_time_readable) VALUES ($1::UUID, $2::UUID, $3::INTEGER, $4::TIMESTAMPTZ, $5::VARCHAR) RETURNING *';
				sentValues = [
					result.rows[0]['id'],
					order.products_ids[i],
					order.products_quantities[i],
					order.date_time,
					order.date_time_readable,
				];

				await client.query(sql, sentValues);
			}

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to create order for user ${
					order.user_id
				}: ${(error as Error).message}`
			);
		}
	};


	show = async (orderID: string): Promise<Order | void> => {
		try {
			const client: PoolClient = await pool.connect();

			const sql: string = 'SELECT * FROM orders WHERE id=($1)::UUID';
			const result = await client.query(sql, [orderID]);

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to show ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	showAll = async (): Promise<Array<Order> | void> => {
		try {
			const client: PoolClient = await pool.connect();

			const sql: string = 'SELECT * FROM orders';
			const result = await client.query(sql);

			client.release();

			return result.rows;
		} catch (error) {
			console.error(
				`Order Model: Unable to show orders: ${
					(error as Error).message
				}`
			);
		}
	};

	
	updateOrderStatus = async (
		orderID: string,
		orderStatus: boolean
	): Promise<Order | void> => {
		try {
			const client: PoolClient = await pool.connect();

			const sql: string =
				'UPDATE orders SET is_done=($2)::BOOLEAN WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [orderID, orderStatus]);

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to update ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	
	delete = async (orderID: string): Promise<Order | void> => {
		try {
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';

			sql =
				'DELETE FROM order_products WHERE order_id=($1)::UUID RETURNING *';
			await client.query(sql, [orderID]);

			sql = 'DELETE FROM orders WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [orderID]);

			client.release();

			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to delete ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default OrderModel;
